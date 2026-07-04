import { getOrCreateNotificationPreferences } from "./notifications";
import { sendSMS, formatSMSMessage } from "./smsService";
import { sendNotificationEmail } from "./emailService";

interface NotificationPayload {
  userId: number;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  channels: string; // comma-separated: in-app,sms,email
  userEmail?: string;
  userPhone?: string;
}

/**
 * Dispatch notification to multiple channels based on user preferences
 */
export async function dispatchNotification(payload: NotificationPayload): Promise<void> {
  try {
    const preferences = await getOrCreateNotificationPreferences(payload.userId);

    if (!preferences) {
      console.warn(`[Dispatcher] Could not get preferences for user ${payload.userId}`);
      return;
    }

    const channels = payload.channels.split(",").map((c) => c.trim());

    // Send via SMS if enabled
    if (channels.includes("sms") && preferences.smsNotifications === "true" && preferences.phoneNumber) {
      const smsMessage = formatSMSMessage(payload.title, payload.message);
      await sendSMS({
        to: preferences.phoneNumber,
        message: smsMessage,
      });
    }

    // Send via Email if enabled
    if (channels.includes("email") && preferences.emailNotifications === "true" && payload.userEmail) {
      await sendNotificationEmail(payload.userEmail, payload.title, payload.message);
    }

    // In-app notifications are already stored in the database by createNotification()
    // This dispatcher just handles additional channels

    console.log(`[Dispatcher] Notification dispatched for user ${payload.userId} via channels: ${channels.join(", ")}`);
  } catch (error) {
    console.error("[Dispatcher] Failed to dispatch notification:", error);
  }
}

/**
 * Dispatch multiple notifications
 */
export async function dispatchBulkNotifications(notifications: NotificationPayload[]): Promise<void> {
  for (const notification of notifications) {
    await dispatchNotification(notification);
  }
}

/**
 * Send scheduled notification (e.g., daily/weekly reports)
 */
export async function sendScheduledNotification(
  userId: number,
  title: string,
  message: string,
  userEmail?: string,
  userPhone?: string
): Promise<void> {
  await dispatchNotification({
    userId,
    title,
    message,
    type: "info",
    channels: "email,sms",
    userEmail,
    userPhone,
  });
}

/**
 * Send urgent notification (payment overdue, etc.)
 */
export async function sendUrgentNotification(
  userId: number,
  title: string,
  message: string,
  userEmail?: string,
  userPhone?: string
): Promise<void> {
  await dispatchNotification({
    userId,
    title,
    message,
    type: "warning",
    channels: "in-app,email,sms",
    userEmail,
    userPhone,
  });
}
