import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const now = new Date();
  const user: AuthenticatedUser = {
    id: 1,
    openId: "custom-notification-test-user",
    email: "custom@example.com",
    name: "Custom Notification Test User",
    loginMethod: "test",
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("notifications.createCustom", () => {
  it("requires a title and message", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.notifications.createCustom({
      type: "info",
      title: "",
      message: "",
      channels: ["in-app"],
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("requires at least one delivery channel", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.notifications.createCustom({
      type: "warning",
      title: "Lease follow-up",
      message: "Call the tenant tomorrow morning.",
      channels: [],
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
