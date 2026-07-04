import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { notifyPaymentRecorded, notifyPaymentFailed, notifyRentOverdue } from "../notificationHelper";

/**
 * Sample payments router with notification triggers
 */

export const paymentsRouter = router({
  /**
   * Get all payments for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual database query
    return [
      {
        id: 1,
        userId: ctx.user.id,
        tenantName: "Ahmed Hassan",
        amount: 5000,
        status: "paid",
        date: new Date(),
        dueDate: new Date(),
      },
      {
        id: 2,
        userId: ctx.user.id,
        tenantName: "Fatima Khan",
        amount: 3000,
        status: "overdue",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ];
  }),

  /**
   * Record a payment
   */
  recordPayment: protectedProcedure
    .input(
      z.object({
        tenantId: z.number(),
        tenantName: z.string(),
        amount: z.number().positive("Amount must be positive"),
        paymentMethod: z.enum(["cash", "bank_transfer", "cheque", "online"]),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database insert
        const payment = {
          id: Math.random(),
          userId: ctx.user.id,
          ...input,
          status: "paid",
          createdAt: new Date(),
        };

        // Trigger success notification
        await notifyPaymentRecorded(ctx.user.id, input.amount, input.tenantName);

        return {
          success: true,
          payment,
          message: `Payment of ₹${input.amount.toLocaleString()} from ${input.tenantName} recorded successfully!`,
        };
      } catch (error) {
        // Trigger error notification
        await notifyPaymentFailed(
          ctx.user.id,
          input.tenantName,
          error instanceof Error ? error.message : "Unknown error"
        );

        return {
          success: false,
          message: "Failed to record payment",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get overdue payments
   */
  getOverdue: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual database query
    return [
      {
        id: 2,
        userId: ctx.user.id,
        tenantName: "Fatima Khan",
        amount: 3000,
        status: "overdue",
        daysOverdue: 5,
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ];
  }),

  /**
   * Send overdue payment reminder
   */
  sendOverdueReminder: protectedProcedure
    .input(
      z.object({
        tenantName: z.string(),
        amount: z.number(),
        daysOverdue: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Trigger overdue notification
        await notifyRentOverdue(ctx.user.id, input.tenantName, input.daysOverdue, input.amount);

        return {
          success: true,
          message: `Overdue reminder sent for ${input.tenantName}`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to send reminder",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get payment statistics
   */
  stats: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual statistics calculation
    return {
      totalCollected: 5000,
      pendingPayments: 3000,
      overduePayments: 3000,
      collectionRate: 62.5,
    };
  }),

  /**
   * Get payment history for a specific tenant
   */
  getTenantHistory: protectedProcedure
    .input(z.object({ tenantId: z.number() }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement actual database query
      return [
        {
          id: 1,
          amount: 5000,
          status: "paid",
          date: new Date(),
          method: "bank_transfer",
        },
      ];
    }),
});
