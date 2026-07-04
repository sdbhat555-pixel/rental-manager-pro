import { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type BannerType = 'success' | 'error' | 'warning' | 'info';

interface NotificationBannerProps {
  type: BannerType;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  dismissible?: boolean;
}

export function NotificationBanner({
  type,
  title,
  message,
  actionLabel,
  onAction,
  onClose,
  dismissible = true,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
    }
  };

  return (
    <div className={`${getBgColor()} border rounded-lg p-4 flex items-start gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h3 className={`font-semibold ${getTextColor()}`}>{title}</h3>
        <p className={`text-sm mt-1 ${getTextColor()}/80`}>{message}</p>
        {actionLabel && (
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>
      {dismissible && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${getTextColor()} hover:opacity-70`}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
