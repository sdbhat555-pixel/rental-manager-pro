import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Check, Trash2, CheckCircle, AlertCircle, AlertTriangle, Info, Send, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

type NotificationType = 'success' | 'error' | 'warning' | 'info';
type Channel = 'in-app' | 'email' | 'sms';

const notificationTypes: { value: NotificationType; label: string }[] = [
  { value: 'info', label: 'Information' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Urgent / Error' },
];

const channelOptions: { value: Channel; label: string; description: string }[] = [
  { value: 'in-app', label: 'In-app', description: 'Show in the notification center' },
  { value: 'email', label: 'Email', description: 'Send to your account email' },
  { value: 'sms', label: 'SMS', description: 'Send to your saved phone number' },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'custom' | 'preferences'>('notifications');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [channels, setChannels] = useState<Channel[]>(['in-app']);
  const [actionUrl, setActionUrl] = useState('');
  const [actionLabel, setActionLabel] = useState('');

  const utils = trpc.useUtils();
  const notificationsQuery = trpc.notifications.list.useQuery({ limit: 50 });
  const preferencesQuery = trpc.notifications.getPreferences.useQuery();
  const markAsRead = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      void utils.notifications.list.invalidate();
      void utils.notifications.unreadCount.invalidate();
    },
  });
  const markAllAsRead = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      void utils.notifications.list.invalidate();
      void utils.notifications.unreadCount.invalidate();
      toast.success('All notifications marked as read');
    },
  });
  const deleteNotification = trpc.notifications.delete.useMutation({
    onSuccess: () => {
      void utils.notifications.list.invalidate();
      void utils.notifications.unreadCount.invalidate();
      toast.success('Notification deleted');
    },
  });
  const sendCustom = trpc.notifications.createCustom.useMutation({
    onSuccess: () => {
      void utils.notifications.list.invalidate();
      void utils.notifications.unreadCount.invalidate();
      toast.success('Custom notification sent');
      setTitle('');
      setMessage('');
      setActionUrl('');
      setActionLabel('');
      setType('info');
      setChannels(['in-app']);
      setActiveTab('notifications');
    },
    onError: (error: { message: string }) => toast.error(error.message || 'Could not send notification'),
  });
  const updatePreferences = trpc.notifications.updatePreferences.useMutation({
    onSuccess: () => {
      void utils.notifications.getPreferences.invalidate();
      toast.success('Notification preferences updated');
    },
    onError: () => toast.error('Could not update notification preferences'),
  });

  const notifications = notificationsQuery.data ?? [];
  const preferences = preferencesQuery.data;
  const unreadCount = notifications.filter((notification) => notification.isRead !== 'true').length;

  const toggleChannel = (channel: Channel) => {
    setChannels((current) => current.includes(channel)
      ? current.filter((item) => item !== channel)
      : [...current, channel]);
  };

  const handleSendCustom = () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Add a title and message first');
      return;
    }
    if (channels.length === 0) {
      toast.error('Choose at least one delivery channel');
      return;
    }

    sendCustom.mutate({
      type,
      title: title.trim(),
      message: message.trim(),
      channels,
      actionUrl: actionUrl.trim() || undefined,
      actionLabel: actionUrl.trim() ? actionLabel.trim() || 'Open' : undefined,
    });
  };

  const getIcon = (notificationType: string) => {
    switch (notificationType) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (value: Date | string) => {
    const date = new Date(value);
    const diffMins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Stay informed</p>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Notifications</h1>
          <p className="mt-2 text-muted-foreground">Create personal alerts and keep every important rental update in one place.</p>
        </div>
        <Button onClick={() => setActiveTab('custom')} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" /> Create custom alert
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-muted-foreground/10">
        {[
          ['notifications', `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`],
          ['custom', 'Custom alert'],
          ['preferences', 'Preferences'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setActiveTab(value as typeof activeTab)}
            className={`border-b-2 px-4 py-3 font-medium transition-colors ${activeTab === value ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {notifications.length > 0 && (
            <div className="flex justify-end">
              <Button onClick={() => markAllAsRead.mutate()} disabled={markAllAsRead.isPending} variant="outline" className="border-accent/20 text-accent hover:bg-accent/10">
                <Check className="mr-2 h-4 w-4" /> Mark all as read
              </Button>
            </div>
          )}
          {notificationsQuery.isLoading ? (
            <Card className="p-12 text-center border-accent/20"><Loader2 className="mx-auto h-8 w-8 animate-spin text-accent" /></Card>
          ) : notifications.length === 0 ? (
            <Card className="border-accent/20 p-12 text-center">
              <Bell className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">No notifications yet</p>
              <Button onClick={() => setActiveTab('custom')} variant="outline" className="mt-4 border-accent/20 text-accent">Create your first alert</Button>
            </Card>
          ) : notifications.map((notification) => (
            <Card key={notification.id} className={`border-accent/20 p-4 ${notification.isRead !== 'true' ? 'border-l-4 border-l-accent bg-accent/5' : ''}`}>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">{getIcon(notification.type)}</div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">{formatTime(notification.createdAt)}</span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {notification.isRead !== 'true' && <Button size="sm" variant="outline" disabled={markAsRead.isPending} onClick={() => markAsRead.mutate({ notificationId: notification.id })} className="border-accent/20 text-accent hover:bg-accent/10"><Check className="mr-1 h-3 w-3" /> Mark as read</Button>}
                    <Button size="sm" variant="outline" disabled={deleteNotification.isPending} onClick={() => deleteNotification.mutate({ notificationId: notification.id })} className="border-destructive/20 text-destructive hover:bg-destructive/10"><Trash2 className="mr-1 h-3 w-3" /> Delete</Button>
                    {notification.actionUrl && <Button size="sm" variant="outline" onClick={() => window.location.assign(notification.actionUrl!)} className="border-accent/20 text-accent">{notification.actionLabel || 'Open'}</Button>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'custom' && (
        <Card className="max-w-3xl border-accent/20 p-6 md:p-8">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-accent/10 p-3"><Send className="h-5 w-5 text-accent" /></div>
            <div><h2 className="text-xl font-semibold text-foreground">Create a custom alert</h2><p className="mt-1 text-sm text-muted-foreground">Send a reminder, follow-up, or private note to yourself through the channels you choose.</p></div>
          </div>
          <div className="grid gap-5">
            <div><label className="mb-2 block text-sm font-medium text-foreground">Title</label><Input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={255} placeholder="e.g. Call tenant about lease renewal" className="bg-muted/50" /></div>
            <div><label className="mb-2 block text-sm font-medium text-foreground">Message</label><Textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} rows={5} placeholder="Write the details you want to remember..." className="resize-none bg-muted/50" /></div>
            <div><label className="mb-2 block text-sm font-medium text-foreground">Alert type</label><select value={type} onChange={(event) => setType(event.target.value as NotificationType)} className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent">{notificationTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
            <div><p className="mb-3 text-sm font-medium text-foreground">Delivery channels</p><div className="grid gap-3 sm:grid-cols-3">{channelOptions.map((option) => <label key={option.value} className={`cursor-pointer rounded-lg border p-3 transition-colors ${channels.includes(option.value) ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40'}`}><div className="flex items-center gap-2"><input type="checkbox" checked={channels.includes(option.value)} onChange={() => toggleChannel(option.value)} className="accent-[oklch(0.70_0.20_60)]" /><span className="font-medium text-foreground">{option.label}</span></div><span className="mt-1 block text-xs text-muted-foreground">{option.description}</span></label>)}</div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-medium text-foreground">Action link <span className="font-normal text-muted-foreground">(optional)</span></label><Input value={actionUrl} onChange={(event) => setActionUrl(event.target.value)} placeholder="/payments" className="bg-muted/50" /></div><div><label className="mb-2 block text-sm font-medium text-foreground">Button label <span className="font-normal text-muted-foreground">(optional)</span></label><Input value={actionLabel} onChange={(event) => setActionLabel(event.target.value)} placeholder="Open payments" className="bg-muted/50" /></div></div>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"><Button variant="outline" onClick={() => setActiveTab('notifications')}>Cancel</Button><Button onClick={handleSendCustom} disabled={sendCustom.isPending} className="bg-accent text-accent-foreground hover:bg-accent/90">{sendCustom.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Send custom alert</Button></div>
          </div>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card className="max-w-2xl border-accent/20 p-6 md:p-8">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Notification Preferences</h2>
          <div className="space-y-5">
            {[
              ['inAppNotifications', 'In-app notifications', 'Keep alerts in the notification center'],
              ['emailNotifications', 'Email notifications', 'Receive alerts at your account email'],
              ['smsNotifications', 'SMS notifications', 'Receive alerts at your saved phone number'],
            ].map(([key, label, description]) => <div key={key} className="flex items-center justify-between gap-4"><div><p className="font-medium text-foreground">{label}</p><p className="text-sm text-muted-foreground">{description}</p></div><Switch checked={preferences?.[key as keyof typeof preferences] === 'true'} onCheckedChange={(checked) => updatePreferences.mutate({ [key]: checked ? 'true' : 'false' })} /></div>)}
            <div className="border-t border-border pt-5"><label className="mb-2 block text-sm font-medium text-foreground">Phone number for SMS</label><Input defaultValue={preferences?.phoneNumber ?? ''} onBlur={(event) => updatePreferences.mutate({ phoneNumber: event.target.value.trim() || undefined })} placeholder="+92-300-1234567" className="bg-muted/50" /></div>
          </div>
        </Card>
      )}
    </div>
  );
}
