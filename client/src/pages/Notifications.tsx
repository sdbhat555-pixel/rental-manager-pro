import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Bell, Check, Trash2, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences'>('notifications');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Payment Recorded',
      message: 'Payment of ₹5,000 from Apartment 101 has been recorded successfully.',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: 2,
      type: 'warning',
      title: 'Overdue Rent Alert',
      message: 'Room 8 rent is 5 days overdue. Please follow up with the tenant.',
      isRead: false,
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: 3,
      type: 'info',
      title: 'Tenant Added',
      message: 'New tenant "Ahmed Hassan" has been added to Office 12.',
      isRead: true,
      createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    },
    {
      id: 4,
      type: 'error',
      title: 'Payment Failed',
      message: 'Payment processing failed for Shop 5. Please retry.',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    inAppNotifications: true,
    paymentReminders: true,
    overdueAlerts: true,
    propertyUpdates: true,
    tenantUpdates: true,
    weeklyReports: false,
    phoneNumber: '+92-300-1234567',
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ));
    toast.success('Notification marked as read');
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleSavePreferences = () => {
    toast.success('Notification preferences updated successfully!');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-accent" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Notifications</h1>
        <p className="text-muted-foreground">Manage your notifications and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-muted-foreground/10">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'notifications'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Bell className="w-4 h-4 inline mr-2" />
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'preferences'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Preferences
        </button>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex gap-2 mb-4">
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          )}

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <Card className="p-12 text-center border-accent/20">
              <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No notifications</p>
            </Card>
          ) : (
            notifications.map(notification => (
              <Card
                key={notification.id}
                className={`p-4 border-accent/20 ${
                  !notification.isRead ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {notification.message}
                    </p>

                    <div className="flex gap-2">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-accent/20 text-accent hover:bg-accent/10"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-destructive/20 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="max-w-2xl">
          <Card className="p-8 border-accent/20">
            <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

            <div className="space-y-6">
              <div className="border-b border-muted-foreground/10 pb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Notification Channels</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">In-App Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                    </div>
                    <Switch
                      checked={preferences.inAppNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, inAppNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email alerts</p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive SMS alerts</p>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, smsNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-muted-foreground/10 pb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Notification Types</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Payment Reminders</p>
                      <p className="text-sm text-muted-foreground">Alerts for payment due dates</p>
                    </div>
                    <Switch
                      checked={preferences.paymentReminders}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, paymentReminders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Overdue Alerts</p>
                      <p className="text-sm text-muted-foreground">Notifications for overdue payments</p>
                    </div>
                    <Switch
                      checked={preferences.overdueAlerts}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, overdueAlerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Property Updates</p>
                      <p className="text-sm text-muted-foreground">Alerts for property changes</p>
                    </div>
                    <Switch
                      checked={preferences.propertyUpdates}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, propertyUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Tenant Updates</p>
                      <p className="text-sm text-muted-foreground">Alerts for tenant changes</p>
                    </div>
                    <Switch
                      checked={preferences.tenantUpdates}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, tenantUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                    </div>
                    <Switch
                      checked={preferences.weeklyReports}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, weeklyReports: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number (for SMS)
                  </label>
                  <Input
                    type="tel"
                    value={preferences.phoneNumber}
                    onChange={(e) =>
                      setPreferences({ ...preferences, phoneNumber: e.target.value })
                    }
                    className="bg-muted border-muted-foreground/20"
                    placeholder="+92-300-1234567"
                  />
                </div>
              </div>

              <Button
                onClick={handleSavePreferences}
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
