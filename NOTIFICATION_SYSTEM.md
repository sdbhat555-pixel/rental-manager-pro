# Rental Manager Pro - Notification System Documentation

## Overview

The Rental Manager Pro notification system provides a comprehensive, multi-channel notification infrastructure for managing rental properties. It supports in-app notifications, SMS alerts, and email notifications with full user preference management.

## Architecture

### Components

1. **Database Layer** (`server/notifications.ts`)
   - `notifications` table: Stores all notifications
   - `notificationPreferences` table: User notification settings
   - CRUD operations for notification management

2. **Service Layer**
   - `notificationHelper.ts`: Pre-built notification templates for common events
   - `smsService.ts`: SMS delivery via Twilio
   - `emailService.ts`: Email delivery via SendGrid
   - `notificationDispatcher.ts`: Multi-channel notification routing

3. **API Layer** (`server/routers/notifications.ts`)
   - tRPC procedures for notification management
   - Preference management endpoints
   - Test notification sending

4. **UI Components**
   - `NotificationCenter.tsx`: Dropdown notification panel with bell icon
   - `NotificationToast.tsx`: Temporary toast notifications
   - `NotificationBanner.tsx`: Top-of-page alert banners
   - `Notifications.tsx`: Full notification history and preferences page

5. **Feature Integration**
   - `properties.ts`: Property management with notifications
   - `payments.ts`: Payment tracking with notifications
   - `tenants.ts`: Tenant management with notifications

## Notification Types

### Success Notifications
- Property added
- Tenant added
- Payment recorded
- Lease renewed

### Warning Notifications
- Rent overdue
- Lease expiring soon
- Property deleted
- Tenant removed
- Maintenance required

### Error Notifications
- Payment failed
- System errors
- Validation errors

### Info Notifications
- Property updated
- Tenant updated
- Occupancy updates
- Weekly reports
- Lease reminders

## Multi-Channel Support

### In-App Notifications
- Real-time display in notification center
- Persistent storage in database
- Mark as read/unread
- Delete functionality

### SMS Notifications (Twilio)
- Requires Twilio account and credentials
- Character limit: 160 characters
- Automatic message truncation
- User phone number management

### Email Notifications (SendGrid)
- Requires SendGrid API key
- HTML email templates
- Professional branding
- Action buttons and links

## Setup Instructions

### 1. Database Setup

The notification tables are already created. Verify they exist:

```sql
SELECT * FROM notifications;
SELECT * FROM notificationPreferences;
```

### 2. Twilio Integration (SMS)

1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Purchase a Twilio phone number
4. Add to environment variables:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### 3. SendGrid Integration (Email)

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create an API key
3. Add to environment variables:
   ```
   SENDGRID_API_KEY=your_api_key
   SENDGRID_FROM_EMAIL=notifications@rentalpro.com
   ```

## Usage Examples

### Triggering Notifications

```typescript
import { notifyPropertyAdded } from "@/server/notificationHelper";

// When a property is added
await notifyPropertyAdded(userId, "123 Main Street");

// When rent is overdue
await notifyRentOverdue(userId, "Ahmed Hassan", 5, 5000);

// When payment is recorded
await notifyPaymentRecorded(userId, 5000, "Ahmed Hassan");
```

### Using the Dispatcher

```typescript
import { dispatchNotification } from "@/server/notificationDispatcher";

await dispatchNotification({
  userId: 1,
  title: "Payment Received",
  message: "Payment of ₹5,000 received from Ahmed Hassan",
  type: "success",
  channels: "in-app,email,sms",
  userEmail: "user@example.com",
  userPhone: "+92-300-1234567",
});
```

### Frontend Usage

```typescript
import { useNotification } from "@/components/NotificationToast";

const notification = useNotification();

// Show success notification
notification.success("Payment Recorded", "Payment of ₹5,000 recorded successfully");

// Show error notification
notification.error("Payment Failed", "Payment processing failed. Please try again.");

// Show warning notification
notification.warning("Overdue Alert", "Rent is 5 days overdue");

// Show info notification
notification.info("Tenant Added", "New tenant has been assigned");
```

### Fetching Notifications (tRPC)

```typescript
import { trpc } from "@/lib/trpc";

// Get all notifications
const { data: notifications } = trpc.notifications.list.useQuery();

// Get unread count
const { data: unreadCount } = trpc.notifications.unreadCount.useQuery();

// Mark as read
const markAsRead = trpc.notifications.markAsRead.useMutation();
await markAsRead.mutateAsync({ notificationId: 1 });

// Get preferences
const { data: prefs } = trpc.notifications.getPreferences.useQuery();

// Update preferences
const updatePrefs = trpc.notifications.updatePreferences.useMutation();
await updatePrefs.mutateAsync({
  emailNotifications: "true",
  smsNotifications: "false",
});
```

## Notification Events

### Property Events
- `notifyPropertyAdded(userId, address)` - When property is created
- `notifyPropertyUpdated(userId, address)` - When property is modified
- `notifyPropertyDeleted(userId, address)` - When property is removed

### Tenant Events
- `notifyTenantAdded(userId, name, property)` - When tenant is added
- `notifyTenantUpdated(userId, name)` - When tenant info is updated
- `notifyTenantDeleted(userId, name)` - When tenant is removed
- `notifyLeaseExpiring(userId, name, date)` - When lease is about to expire

### Payment Events
- `notifyPaymentRecorded(userId, amount, tenant)` - When payment is received
- `notifyPaymentFailed(userId, tenant, reason)` - When payment fails
- `notifyRentOverdue(userId, tenant, days, amount)` - When rent is overdue
- `notifyRentDueReminder(userId, tenant, date, amount)` - Rent due reminder

### System Events
- `notifyOccupancyUpdate(userId, rate)` - Occupancy rate changes
- `notifyWeeklyReport(userId, collected, pending)` - Weekly summary
- `notifyMaintenanceRequired(userId, property, issue)` - Maintenance needed
- `notifyDocumentExpiring(userId, type, date)` - Document expiration

## User Preferences

Users can customize notifications through the Preferences tab:

- **Notification Channels**: In-app, Email, SMS
- **Notification Types**: Payments, Overdue, Properties, Tenants, Weekly Reports
- **Contact Info**: Phone number for SMS

## Best Practices

1. **Always use notification helpers** - Don't create raw notifications directly
2. **Include user email/phone** - Pass to dispatcher for multi-channel delivery
3. **Keep messages concise** - Especially for SMS (160 char limit)
4. **Use appropriate types** - success/error/warning/info for proper UX
5. **Respect user preferences** - Check settings before sending
6. **Test in development** - Use test notification endpoint
7. **Monitor delivery** - Check logs for failures

## Troubleshooting

### SMS Not Sending
- Verify Twilio credentials in environment variables
- Check user phone number format
- Ensure SMS notifications are enabled in preferences

### Emails Not Sending
- Verify SendGrid API key
- Check sender email is verified in SendGrid
- Ensure email notifications are enabled

### Notifications Not Appearing
- Check database connectivity
- Verify user ID is correct
- Check browser console for errors
- Ensure in-app notifications are enabled

## Future Enhancements

- [ ] Push notifications (mobile app)
- [ ] WhatsApp integration
- [ ] Scheduled notifications
- [ ] Notification templates customization
- [ ] Notification analytics
- [ ] Notification scheduling
- [ ] Bulk notification sending
- [ ] Notification webhooks

## Support

For issues or questions, contact the development team or refer to the inline code documentation.
