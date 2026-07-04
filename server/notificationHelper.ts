import { createNotification } from "./notifications";

/**
 * Helper functions to trigger notifications for various events
 */

export async function notifyPropertyAdded(userId: number, propertyAddress: string) {
  await createNotification({
    userId,
    type: "success",
    title: "Property Added",
    message: `New property "${propertyAddress}" has been added successfully.`,
    channels: "in-app,email",
  });
}

export async function notifyPropertyUpdated(userId: number, propertyAddress: string) {
  await createNotification({
    userId,
    type: "info",
    title: "Property Updated",
    message: `Property "${propertyAddress}" has been updated.`,
    channels: "in-app,email",
  });
}

export async function notifyPropertyDeleted(userId: number, propertyAddress: string) {
  await createNotification({
    userId,
    type: "warning",
    title: "Property Deleted",
    message: `Property "${propertyAddress}" has been removed from your account.`,
    channels: "in-app,email",
  });
}

export async function notifyTenantAdded(userId: number, tenantName: string, propertyAddress: string) {
  await createNotification({
    userId,
    type: "success",
    title: "Tenant Added",
    message: `New tenant "${tenantName}" has been assigned to ${propertyAddress}.`,
    channels: "in-app,email",
  });
}

export async function notifyTenantUpdated(userId: number, tenantName: string) {
  await createNotification({
    userId,
    type: "info",
    title: "Tenant Updated",
    message: `Tenant information for "${tenantName}" has been updated.`,
    channels: "in-app,email",
  });
}

export async function notifyTenantDeleted(userId: number, tenantName: string) {
  await createNotification({
    userId,
    type: "warning",
    title: "Tenant Removed",
    message: `Tenant "${tenantName}" has been removed from your account.`,
    channels: "in-app,email",
  });
}

export async function notifyPaymentRecorded(userId: number, amount: number, tenantName: string) {
  await createNotification({
    userId,
    type: "success",
    title: "Payment Recorded",
    message: `Payment of ₹${amount.toLocaleString()} from ${tenantName} has been recorded successfully.`,
    channels: "in-app,email,sms",
  });
}

export async function notifyPaymentFailed(userId: number, tenantName: string, reason: string) {
  await createNotification({
    userId,
    type: "error",
    title: "Payment Failed",
    message: `Payment processing failed for ${tenantName}. Reason: ${reason}`,
    channels: "in-app,email,sms",
  });
}

export async function notifyRentOverdue(userId: number, tenantName: string, daysOverdue: number, amount: number) {
  await createNotification({
    userId,
    type: "warning",
    title: "Overdue Rent Alert",
    message: `Rent from ${tenantName} is ${daysOverdue} days overdue. Amount due: ₹${amount.toLocaleString()}. Please follow up with the tenant.`,
    channels: "in-app,email,sms",
  });
}

export async function notifyRentDueReminder(userId: number, tenantName: string, dueDate: string, amount: number) {
  await createNotification({
    userId,
    type: "info",
    title: "Rent Due Reminder",
    message: `Rent from ${tenantName} is due on ${dueDate}. Amount: ₹${amount.toLocaleString()}`,
    channels: "in-app,email,sms",
  });
}

export async function notifyLeaseExpiring(userId: number, tenantName: string, expiryDate: string) {
  await createNotification({
    userId,
    type: "warning",
    title: "Lease Expiring Soon",
    message: `Lease for ${tenantName} is expiring on ${expiryDate}. Please plan for renewal or replacement.`,
    channels: "in-app,email",
  });
}

export async function notifyOccupancyUpdate(userId: number, occupancyRate: number) {
  await createNotification({
    userId,
    type: "info",
    title: "Occupancy Update",
    message: `Your current occupancy rate is ${occupancyRate}%. Check the dashboard for more details.`,
    channels: "in-app,email",
  });
}

export async function notifyWeeklyReport(userId: number, rentCollected: number, pendingPayments: number) {
  await createNotification({
    userId,
    type: "info",
    title: "Weekly Report",
    message: `This week: ₹${rentCollected.toLocaleString()} collected, ₹${pendingPayments.toLocaleString()} pending. View full report in the Reports section.`,
    channels: "in-app,email",
  });
}

export async function notifyMaintenanceRequired(userId: number, propertyAddress: string, issue: string) {
  await createNotification({
    userId,
    type: "warning",
    title: "Maintenance Required",
    message: `Maintenance needed at ${propertyAddress}: ${issue}. Please arrange for repairs.`,
    channels: "in-app,email",
  });
}

export async function notifyDocumentExpiring(userId: number, documentType: string, expiryDate: string) {
  await createNotification({
    userId,
    type: "warning",
    title: `${documentType} Expiring`,
    message: `Your ${documentType} will expire on ${expiryDate}. Please renew it in time.`,
    channels: "in-app,email",
  });
}
