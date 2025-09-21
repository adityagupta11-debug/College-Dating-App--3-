import { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { useTheme } from './ThemeProvider';
import { 
  ChevronRight, 
  User, 
  Search, 
  Shield, 
  Bell, 
  Heart, 
  Zap, 
  HelpCircle, 
  FileText, 
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  Users,
  Lock,
  Phone,
  Mail,
  Camera,
  Volume,
  Vibrate,
  Globe,
  Download,
  Upload,
  Moon,
  Sun
} from 'lucide-react';

interface SettingsState {
  // Discovery Preferences
  ageRange: [number, number];
  maxDistance: number;
  showMe: string;
  lookingFor: string;
  
  // Privacy Settings
  showOnApp: boolean;
  incognitoMode: boolean;
  readReceipts: boolean;
  onlineStatus: boolean;
  
  // Notification Settings
  newMatches: boolean;
  newMessages: boolean;
  likes: boolean;
  superLikes: boolean;
  topPicks: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  
  // App Preferences
  autoPlayVideos: boolean;
  reduceDataUsage: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  
  // Account Settings
  email: string;
  phoneNumber: string;
  verifiedAccount: boolean;
}

export function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<SettingsState>({
    ageRange: [18, 25],
    maxDistance: 50,
    showMe: 'everyone',
    lookingFor: 'long-term',
    showOnApp: true,
    incognitoMode: false,
    readReceipts: true,
    onlineStatus: true,
    newMatches: true,
    newMessages: true,
    likes: true,
    superLikes: true,
    topPicks: false,
    pushNotifications: true,
    emailNotifications: false,
    autoPlayVideos: true,
    reduceDataUsage: false,
    soundEffects: true,
    hapticFeedback: true,
    email: 'user@asu.edu',
    phoneNumber: '+1 (480) 555-0123',
    verifiedAccount: true
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateSetting = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingRow = ({ 
    icon: Icon, 
    title, 
    description, 
    children, 
    onClick 
  }: { 
    icon: any, 
    title: string, 
    description?: string, 
    children?: React.ReactNode, 
    onClick?: () => void 
  }) => (
    <div className="flex items-center justify-between py-3 px-4" onClick={onClick}>
      <div className="flex items-center gap-3 flex-1">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          {description && <div className="text-sm text-muted-foreground">{description}</div>}
        </div>
      </div>
      {children}
      {onClick && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="p-4">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground">Manage your Sun Devil Match experience</p>
          </div>
        </div>

        <div className="space-y-6 p-4">
          {/* Account Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={Mail} 
                title="Email" 
                description={settings.email}
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Phone} 
                title="Phone Number" 
                description={settings.phoneNumber}
                children={
                  settings.verifiedAccount ? 
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge> : 
                    <Badge variant="outline">Unverified</Badge>
                }
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Camera} 
                title="Manage Photos" 
                description="Add, remove, or reorder your photos"
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={FileText} 
                title="Edit Profile Info" 
                description="Update your bio, prompts, and details"
                onClick={() => {}}
              />
            </CardContent>
          </Card>

          {/* Discovery Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Discovery Preferences
              </CardTitle>
              <CardDescription>Control who you see and who sees you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age Range */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label>Age Range</label>
                  <span className="text-sm text-muted-foreground">
                    {settings.ageRange[0]} - {settings.ageRange[1]}
                  </span>
                </div>
                <Slider
                  value={settings.ageRange}
                  onValueChange={(value) => updateSetting('ageRange', value)}
                  max={65}
                  min={18}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Distance */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label>Maximum Distance</label>
                  <span className="text-sm text-muted-foreground">{settings.maxDistance} miles</span>
                </div>
                <Slider
                  value={[settings.maxDistance]}
                  onValueChange={(value) => updateSetting('maxDistance', value[0])}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Show Me */}
              <div>
                <label className="block mb-2">Show Me</label>
                <Select value={settings.showMe} onValueChange={(value) => updateSetting('showMe', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="everyone">Everyone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Looking For */}
              <div>
                <label className="block mb-2">Looking For</label>
                <Select value={settings.lookingFor} onValueChange={(value) => updateSetting('lookingFor', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Something casual</SelectItem>
                    <SelectItem value="serious">Serious relationship</SelectItem>
                    <SelectItem value="long-term">Long-term partner</SelectItem>
                    <SelectItem value="friends">New friends</SelectItem>
                    <SelectItem value="unsure">Still figuring it out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={Eye} 
                title="Show me on Sun Devil Match" 
                description="Turn off to hide your profile"
                children={
                  <Switch 
                    checked={settings.showOnApp} 
                    onCheckedChange={(checked) => updateSetting('showOnApp', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={EyeOff} 
                title="Incognito Mode" 
                description="Only people you like can see you"
                children={
                  <Switch 
                    checked={settings.incognitoMode} 
                    onCheckedChange={(checked) => updateSetting('incognitoMode', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Eye} 
                title="Read Receipts" 
                description="See when matches read your messages"
                children={
                  <Switch 
                    checked={settings.readReceipts} 
                    onCheckedChange={(checked) => updateSetting('readReceipts', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Globe} 
                title="Online Status" 
                description="Show when you're active"
                children={
                  <Switch 
                    checked={settings.onlineStatus} 
                    onCheckedChange={(checked) => updateSetting('onlineStatus', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Lock} 
                title="Blocked Users" 
                description="Manage blocked profiles"
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Shield} 
                title="Safety Center" 
                description="Tips and tools for safe dating"
                onClick={() => {}}
              />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={Bell} 
                title="Push Notifications" 
                children={
                  <Switch 
                    checked={settings.pushNotifications} 
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Mail} 
                title="Email Notifications" 
                children={
                  <Switch 
                    checked={settings.emailNotifications} 
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Heart} 
                title="New Matches" 
                children={
                  <Switch 
                    checked={settings.newMatches} 
                    onCheckedChange={(checked) => updateSetting('newMatches', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Users} 
                title="Messages" 
                children={
                  <Switch 
                    checked={settings.newMessages} 
                    onCheckedChange={(checked) => updateSetting('newMessages', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Heart} 
                title="Likes" 
                children={
                  <Switch 
                    checked={settings.likes} 
                    onCheckedChange={(checked) => updateSetting('likes', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Zap} 
                title="Super Likes" 
                children={
                  <Switch 
                    checked={settings.superLikes} 
                    onCheckedChange={(checked) => updateSetting('superLikes', checked)}
                  />
                }
              />
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={theme === 'dark' ? Moon : Sun} 
                title="Theme" 
                description={`Currently using ${theme} mode`}
                children={
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                }
              />
              <Separator />
              <SettingRow 
                icon={Camera} 
                title="Auto-play Videos" 
                description="Videos play automatically in profiles"
                children={
                  <Switch 
                    checked={settings.autoPlayVideos} 
                    onCheckedChange={(checked) => updateSetting('autoPlayVideos', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Download} 
                title="Reduce Data Usage" 
                description="Use less data for images and videos"
                children={
                  <Switch 
                    checked={settings.reduceDataUsage} 
                    onCheckedChange={(checked) => updateSetting('reduceDataUsage', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Volume} 
                title="Sound Effects" 
                children={
                  <Switch 
                    checked={settings.soundEffects} 
                    onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                  />
                }
              />
              <Separator />
              <SettingRow 
                icon={Vibrate} 
                title="Haptic Feedback" 
                children={
                  <Switch 
                    checked={settings.hapticFeedback} 
                    onCheckedChange={(checked) => updateSetting('hapticFeedback', checked)}
                  />
                }
              />
            </CardContent>
          </Card>



          {/* Help & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={HelpCircle} 
                title="Help Center" 
                description="FAQs and troubleshooting"
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Mail} 
                title="Contact Us" 
                description="Get help from our support team"
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Shield} 
                title="Report a Problem" 
                description="Report bugs or safety issues"
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={FileText} 
                title="Community Guidelines" 
                onClick={() => {}}
              />
            </CardContent>
          </Card>

          {/* Legal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={FileText} 
                title="Terms of Service" 
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Lock} 
                title="Privacy Policy" 
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={FileText} 
                title="Licenses" 
                onClick={() => {}}
              />
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <SettingRow 
                icon={LogOut} 
                title="Sign Out" 
                onClick={() => {}}
              />
              <Separator />
              <SettingRow 
                icon={Trash2} 
                title="Delete Account" 
                description="Permanently delete your account"
                onClick={() => setShowDeleteDialog(true)}
              />
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground space-y-1 py-4">
            <div>Sun Devil Match v1.0.0</div>
            <div>Made with ❤️ for ASU</div>
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-red-600">Delete Account</CardTitle>
              <CardDescription>
                This action cannot be undone. All your matches, messages, and profile data will be permanently deleted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertDescription>
                  Are you sure you want to delete your account?
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    // Handle account deletion
                    setShowDeleteDialog(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}