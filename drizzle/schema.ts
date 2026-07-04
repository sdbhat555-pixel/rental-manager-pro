import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Notifications table for storing all in-app notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["success", "error", "warning", "info"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 500 }),
  actionLabel: varchar("actionLabel", { length: 100 }),
  isRead: mysqlEnum("isRead", ["true", "false"]).default("false").notNull(),
  channels: varchar("channels", { length: 255 }).default("in-app").notNull(), // comma-separated: in-app,sms,email
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Notification preferences for each user
 */
export const notificationPreferences = mysqlTable("notificationPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  emailNotifications: mysqlEnum("emailNotifications", ["true", "false"]).default("true").notNull(),
  smsNotifications: mysqlEnum("smsNotifications", ["true", "false"]).default("true").notNull(),
  inAppNotifications: mysqlEnum("inAppNotifications", ["true", "false"]).default("true").notNull(),
  paymentReminders: mysqlEnum("paymentReminders", ["true", "false"]).default("true").notNull(),
  overdueAlerts: mysqlEnum("overdueAlerts", ["true", "false"]).default("true").notNull(),
  propertyUpdates: mysqlEnum("propertyUpdates", ["true", "false"]).default("true").notNull(),
  tenantUpdates: mysqlEnum("tenantUpdates", ["true", "false"]).default("true").notNull(),
  weeklyReports: mysqlEnum("weeklyReports", ["true", "false"]).default("false").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type InsertNotificationPreference = typeof notificationPreferences.$inferInsert;

// TODO: Add your additional tables here