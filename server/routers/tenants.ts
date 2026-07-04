import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { notifyTenantAdded, notifyTenantUpdated, notifyTenantDeleted } from "../notificationHelper";

/**
 * Sample tenants router with notification triggers
 */

export const tenantsRouter = router({
  /**
   * Get all tenants for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual database query
    return [
      {
        id: 1,
        userId: ctx.user.id,
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        phone: "+92-300-1234567",
        propertyId: 1,
        propertyAddress: "123 Main Street, Downtown",
        leaseStartDate: new Date(2024, 0, 1),
        leaseEndDate: new Date(2025, 0, 1),
        rentAmount: 5000,
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: ctx.user.id,
        name: "Fatima Khan",
        email: "fatima@example.com",
        phone: "+92-300-7654321",
        propertyId: 2,
        propertyAddress: "456 Oak Avenue, Suburbs",
        leaseStartDate: new Date(2023, 6, 1),
        leaseEndDate: new Date(2024, 6, 1),
        rentAmount: 3000,
        createdAt: new Date(),
      },
    ];
  }),

  /**
   * Get a single tenant
   */
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement actual database query
      return {
        id: input.id,
        userId: ctx.user.id,
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        phone: "+92-300-1234567",
        propertyId: 1,
        propertyAddress: "123 Main Street, Downtown",
        leaseStartDate: new Date(2024, 0, 1),
        leaseEndDate: new Date(2025, 0, 1),
        rentAmount: 5000,
        createdAt: new Date(),
      };
    }),

  /**
   * Add a new tenant
   */
  add: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone is required"),
        propertyId: z.number(),
        propertyAddress: z.string(),
        leaseStartDate: z.date(),
        leaseEndDate: z.date(),
        rentAmount: z.number().positive("Rent amount must be positive"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database insert
        const newTenant = {
          id: Math.random(),
          userId: ctx.user.id,
          ...input,
          createdAt: new Date(),
        };

        // Trigger notification
        await notifyTenantAdded(ctx.user.id, input.name, input.propertyAddress);

        return {
          success: true,
          tenant: newTenant,
          message: `Tenant "${input.name}" added successfully to ${input.propertyAddress}!`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to add tenant",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Update a tenant
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        leaseStartDate: z.date().optional(),
        leaseEndDate: z.date().optional(),
        rentAmount: z.number().positive().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database update
        const updatedTenant = {
          id: input.id,
          userId: ctx.user.id,
          name: input.name || "Ahmed Hassan",
          email: input.email || "ahmed@example.com",
          phone: input.phone || "+92-300-1234567",
          leaseStartDate: input.leaseStartDate || new Date(),
          leaseEndDate: input.leaseEndDate || new Date(),
          rentAmount: input.rentAmount || 5000,
          updatedAt: new Date(),
        };

        // Trigger notification
        if (input.name) {
          await notifyTenantUpdated(ctx.user.id, input.name);
        }

        return {
          success: true,
          tenant: updatedTenant,
          message: "Tenant updated successfully!",
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to update tenant",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Delete a tenant
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database delete
        const tenantName = "Ahmed Hassan"; // In real implementation, fetch from DB

        // Trigger notification
        await notifyTenantDeleted(ctx.user.id, tenantName);

        return {
          success: true,
          message: `Tenant deleted successfully!`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to delete tenant",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get tenants with expiring leases
   */
  getExpiringLeases: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual database query with date filtering
    return [
      {
        id: 2,
        userId: ctx.user.id,
        name: "Fatima Khan",
        propertyAddress: "456 Oak Avenue, Suburbs",
        leaseEndDate: new Date(2024, 6, 1),
        daysUntilExpiry: 15,
      },
    ];
  }),
});
