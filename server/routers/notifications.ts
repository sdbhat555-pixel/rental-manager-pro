import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createNotification,
  getUserNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getOrCreateNotificationPreferences,
  updateNotificationPreferences,
  getUnreadNotificationCount,
} from "../notifications";

export const notificationRouter = router({
  /**
   * Get all notifications for the current user
   */
  list: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ ctx, input }) => {
      return await getUserNotifications(ctx.user.id, input?.limit || 50);
    }),

  /**
   * Get unread notifications for the current user
   */
  unread: protectedProcedure.query(async ({ ctx }) => {
    return await getUnreadNotifications(ctx.user.id);
  }),

  /**
   * Get count of unread notifications
   */
  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    return await getUnreadNotificationCount(ctx.user.id);
  }),

  /**
   * Mark a notification as read
   */
  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ input }) => {
      return await markNotificationAsRead(input.notificationId);
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    return await markAllNotificationsAsRead(ctx.user.id);
  }),

  /**
   * Delete a notification
   */
  delete: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteNotification(input.notificationId);
    }),

  /**
   * Get notification preferences
   */
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    return await getOrCreateNotificationPreferences(ctx.user.id);
  }),

  /**
   * Update notification preferences
   */
  updatePreferences: protectedProcedure
    .input(
      z.object({
        emailNotifications: z.enum(["true", "false"]).optional(),
        smsNotifications: z.enum(["true", "false"]).optional(),
        inAppNotifications: z.enum(["true", "false"]).optional(),
        paymentReminders: z.enum(["true", "false"]).optional(),
        overdueAlerts: z.enum(["true", "false"]).optional(),
        propertyUpdates: z.enum(["true", "false"]).optional(),
        tenantUpdates: z.enum(["true", "false"]).optional(),
        weeklyReports: z.enum(["true", "false"]).optional(),
        phoneNumber: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await updateNotificationPreferences(ctx.user.id, input);
    }),

  /**
   * Create a test notification (for demo purposes)
   */
  sendTest: protectedProcedure
    .input(
      z.object({
        type: z.enum(["success", "error", "warning", "info"]),
        title: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await createNotification({
        userId: ctx.user.id,
        type: input.type,
        title: input.title,
        message: input.message,
        channels: "in-app,email,sms",
      });
    }),

  /**
   * Create a custom alert for the signed-in user and dispatch optional channels.
   */
  createCustom: protectedProcedure
    .input(
      z.object({
        type: z.enum(["success", "error", "warning", "info"]),
        title: z.string().trim().min(1).max(255),
        message: z.string().trim().min(1).max(2000),
        channels: z.array(z.enum(["in-app", "email", "sms"])).min(1),
        actionUrl: z.string().trim().max(500).optional(),
        actionLabel: z.string().trim().max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const channels = input.channels.join(",");
      const notification = await createNotification({
        userId: ctx.user.id,
        type: input.type,
        title: input.title,
        message: input.message,
        channels,
        actionUrl: input.actionUrl || undefined,
        actionLabel: input.actionLabel || undefined,
      });

      if (!notification) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not save the notification" });
      }

      if (channels.includes("email") || channels.includes("sms")) {
        const { dispatchNotification } = await import("../notificationDispatcher");
        await dispatchNotification({
          userId: ctx.user.id,
          title: input.title,
          message: input.message,
          type: input.type,
          channels,
          userEmail: ctx.user.email ?? undefined,
        });
      }

      return notification;
    }),
});
