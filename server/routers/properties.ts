import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { notifyPropertyAdded, notifyPropertyUpdated, notifyPropertyDeleted } from "../notificationHelper";

/**
 * Sample properties router with notification triggers
 * This demonstrates how to integrate notifications into your feature routers
 */

export const propertiesRouter = router({
  /**
   * Get all properties for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual database query
    // For now, return mock data
    return [
      {
        id: 1,
        userId: ctx.user.id,
        address: "123 Main Street, Downtown",
        type: "apartment",
        rentAmount: 5000,
        status: "occupied",
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: ctx.user.id,
        address: "456 Oak Avenue, Suburbs",
        type: "house",
        rentAmount: 8000,
        status: "vacant",
        createdAt: new Date(),
      },
    ];
  }),

  /**
   * Get a single property
   */
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // TODO: Implement actual database query
      return {
        id: input.id,
        userId: ctx.user.id,
        address: "123 Main Street, Downtown",
        type: "apartment",
        rentAmount: 5000,
        status: "occupied",
        createdAt: new Date(),
      };
    }),

  /**
   * Add a new property
   */
  add: protectedProcedure
    .input(
      z.object({
        address: z.string().min(1, "Address is required"),
        type: z.enum(["apartment", "house", "shop", "office", "other"]),
        rentAmount: z.number().positive("Rent amount must be positive"),
        status: z.enum(["occupied", "vacant"]).default("vacant"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database insert
        const newProperty = {
          id: Math.random(),
          userId: ctx.user.id,
          ...input,
          createdAt: new Date(),
        };

        // Trigger notification
        await notifyPropertyAdded(ctx.user.id, input.address);

        return {
          success: true,
          property: newProperty,
          message: `Property "${input.address}" added successfully!`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to add property",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Update a property
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        address: z.string().optional(),
        type: z.enum(["apartment", "house", "shop", "office", "other"]).optional(),
        rentAmount: z.number().positive().optional(),
        status: z.enum(["occupied", "vacant"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database update
        const updatedProperty = {
          id: input.id,
          userId: ctx.user.id,
          address: input.address || "123 Main Street",
          type: input.type || "apartment",
          rentAmount: input.rentAmount || 5000,
          status: input.status || "occupied",
          updatedAt: new Date(),
        };

        // Trigger notification
        if (input.address) {
          await notifyPropertyUpdated(ctx.user.id, input.address);
        }

        return {
          success: true,
          property: updatedProperty,
          message: "Property updated successfully!",
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to update property",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Delete a property
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Implement actual database delete
        const propertyAddress = "123 Main Street, Downtown"; // In real implementation, fetch from DB

        // Trigger notification
        await notifyPropertyDeleted(ctx.user.id, propertyAddress);

        return {
          success: true,
          message: `Property deleted successfully!`,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to delete property",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get property statistics
   */
  stats: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Implement actual statistics calculation
    return {
      totalProperties: 2,
      occupiedProperties: 1,
      vacantProperties: 1,
      occupancyRate: 50,
      totalRentAmount: 13000,
    };
  }),
});
