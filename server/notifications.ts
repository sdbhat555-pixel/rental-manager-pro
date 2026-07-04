import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { notifications, notificationPreferences, Notification, NotificationPreference } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Create a new notification
 */
export async function createNotification(data: {
  userId: number;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  channels?: string;
  expiresAt?: Date;
}): Promise<Notification | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot create notification: database not available");
    return null;
  }

  try {
    await db.insert(notifications).values({
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      actionUrl: data.actionUrl,
      actionLabel: data.actionLabel,
      channels: data.channels || "in-app",
      isRead: "false",
      expiresAt: data.expiresAt,
    });

    // Fetch and return the created notification (get the most recent one for this user)
    const created = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, data.userId))
      .orderBy(desc(notifications.createdAt))
      .limit(1);

    return created[0] || null;
  } catch (error) {
    console.error("[Notifications] Failed to create notification:", error);
    return null;
  }
}

/**
 * Get all notifications for a user
 */
export async function getUserNotifications(userId: number, limit = 50): Promise<Notification[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot get notifications: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Notifications] Failed to get notifications:", error);
    return [];
  }
}

/**
 * Get unread notifications for a user
 */
export async function getUnreadNotifications(userId: number): Promise<Notification[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot get unread notifications: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId) && eq(notifications.isRead, "false"))
      .orderBy(desc(notifications.createdAt));
  } catch (error) {
    console.error("[Notifications] Failed to get unread notifications:", error);
    return [];
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot mark as read: database not available");
    return false;
  }

  try {
    await db
      .update(notifications)
      .set({ isRead: "true" })
      .where(eq(notifications.id, notificationId));
    return true;
  } catch (error) {
    console.error("[Notifications] Failed to mark as read:", error);
    return false;
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot mark all as read: database not available");
    return false;
  }

  try {
    await db
      .update(notifications)
      .set({ isRead: "true" })
      .where(eq(notifications.userId, userId) && eq(notifications.isRead, "false"));
    return true;
  } catch (error) {
    console.error("[Notifications] Failed to mark all as read:", error);
    return false;
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot delete notification: database not available");
    return false;
  }

  try {
    await db.delete(notifications).where(eq(notifications.id, notificationId));
    return true;
  } catch (error) {
    console.error("[Notifications] Failed to delete notification:", error);
    return false;
  }
}

/**
 * Get or create notification preferences for a user
 */
export async function getOrCreateNotificationPreferences(userId: number): Promise<NotificationPreference | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot get preferences: database not available");
    return null;
  }

  try {
    const existing = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    // Create default preferences
    await db.insert(notificationPreferences).values({
      userId,
      emailNotifications: "true",
      smsNotifications: "true",
      inAppNotifications: "true",
      paymentReminders: "true",
      overdueAlerts: "true",
      propertyUpdates: "true",
      tenantUpdates: "true",
      weeklyReports: "false",
    });

    const created = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId))
      .limit(1);

    return created[0] || null;
  } catch (error) {
    console.error("[Notifications] Failed to get/create preferences:", error);
    return null;
  }
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  userId: number,
  updates: Partial<NotificationPreference>
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot update preferences: database not available");
    return false;
  }

  try {
    await db
      .update(notificationPreferences)
      .set(updates)
      .where(eq(notificationPreferences.userId, userId));
    return true;
  } catch (error) {
    console.error("[Notifications] Failed to update preferences:", error);
    return false;
  }
}

/**
 * Get count of unread notifications
 */
export async function getUnreadNotificationCount(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Notifications] Cannot get unread count: database not available");
    return 0;
  }

  try {
    const result = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId) && eq(notifications.isRead, "false"));
    return result.length;
  } catch (error) {
    console.error("[Notifications] Failed to get unread count:", error);
    return 0;
  }
}
