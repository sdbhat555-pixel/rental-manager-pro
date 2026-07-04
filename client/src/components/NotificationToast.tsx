
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { toast } from 'sonner';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationToastProps {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export function showNotificationToast({
  type,
  title,
  message,
  duration = 5000,
  actionLabel,
  onAction,
}: NotificationToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  toast.custom(
    () => (
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
          {actionLabel && (
            <button
              onClick={onAction}
              className="text-sm text-accent hover:text-accent/80 font-medium mt-2"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    ),
    {
      duration,
      position: 'bottom-right',
    }
  );
}

/**
 * Hook to show notifications with different types
 */
export function useNotification() {
  return {
    success: (title: string, message: string, duration?: number) =>
      showNotificationToast({ type: 'success', title, message, duration }),
    error: (title: string, message: string, duration?: number) =>
      showNotificationToast({ type: 'error', title, message, duration }),
    warning: (title: string, message: string, duration?: number) =>
      showNotificationToast({ type: 'warning', title, message, duration }),
    info: (title: string, message: string, duration?: number) =>
      showNotificationToast({ type: 'info', title, message, duration }),
  };
}
