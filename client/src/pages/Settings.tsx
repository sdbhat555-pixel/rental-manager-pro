import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Shield, Info, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

export default function Settings() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'about'>('profile');
  const [profileData, setProfileData] = useState({
    businessName: 'Rental Manager Pro',
    businessEmail: 'business@example.com',
    businessPhone: '+92-300-1234567',
    businessAddress: '123 Business St, Downtown',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    darkMode: true,
    autoBackup: true,
  });

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const handlePreferencesUpdate = () => {
    toast.success('Preferences updated successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and account</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-muted-foreground/10">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'preferences'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <SettingsIcon className="w-4 h-4 inline mr-2" />
          Preferences
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === 'about'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Info className="w-4 h-4 inline mr-2" />
          About
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <Card className="p-8 border-accent/20">
            <h2 className="text-xl font-semibold text-foreground mb-6">Business Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                <Input
                  value={profileData.businessName}
                  onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Email</label>
                <Input
                  type="email"
                  value={profileData.businessEmail}
                  onChange={(e) => setProfileData({ ...profileData, businessEmail: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Phone</label>
                <Input
                  value={profileData.businessPhone}
                  onChange={(e) => setProfileData({ ...profileData, businessPhone: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Address</label>
                <Input
                  value={profileData.businessAddress}
                  onChange={(e) => setProfileData({ ...profileData, businessAddress: e.target.value })}
                  className="bg-muted border-muted-foreground/20"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleProfileUpdate}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="max-w-2xl">
          <Card className="p-8 border-accent/20">
            <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive payment reminders via email</p>
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
                  <p className="text-sm text-muted-foreground">Receive payment reminders via SMS</p>
                </div>
                <Switch
                  checked={preferences.smsNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, smsNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">WhatsApp Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive payment reminders via WhatsApp</p>
                </div>
                <Switch
                  checked={preferences.whatsappNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, whatsappNotifications: checked })
                  }
                />
              </div>

              <div className="border-t border-muted-foreground/10 pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">App Settings</h3>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-foreground font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use dark theme throughout the app</p>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, darkMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">Auto Backup</p>
                    <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
                  </div>
                  <Switch
                    checked={preferences.autoBackup}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, autoBackup: checked })
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handlePreferencesUpdate}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="max-w-2xl">
          <Card className="p-8 border-accent/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/80 mx-auto mb-4">
                <div className="text-3xl font-bold text-accent-foreground">RM</div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Rental Manager Pro</h2>
              <p className="text-accent mt-2">Smart. Simple. Secure.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">About This App</h3>
                <p className="text-muted-foreground">
                  Rental Manager Pro is a comprehensive solution for managing rental properties, tenants, and payments. 
                  It provides an intuitive interface for tracking rent collection, managing tenant information, and 
                  generating detailed reports to help you manage your rental business efficiently.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="text-lg font-semibold text-foreground">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Release Date</p>
                  <p className="text-lg font-semibold text-foreground">June 2024</p>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Developer</h3>
                <p className="text-accent font-semibold text-lg">Shahid Ibn Rashid</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Developed with passion to simplify rental property management.
                </p>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Property Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Tenant Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Payment Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Detailed Reports & Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Notification Reminders
                  </li>
                </ul>
              </div>

              <div className="border-t border-muted-foreground/10 pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  © 2024 Rental Manager Pro. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Developed by <span className="text-accent font-semibold">Shahid Ibn Rashid</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
