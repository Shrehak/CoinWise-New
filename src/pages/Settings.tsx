
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellRing, Cloud, Cpu, Database, Moon, Shield, User, Wallet } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Moon className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Cpu className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account settings and manage your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" placeholder="USD" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Sync</CardTitle>
              <CardDescription>Manage your data synchronization options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cloud-sync">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      <span>Cloud Sync</span>
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Synchronize your data across multiple devices
                  </p>
                </div>
                <Switch id="cloud-sync" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span>Automatic Backups</span>
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Create automatic backups of your financial data
                  </p>
                </div>
                <Switch id="auto-backup" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interface Preferences</CardTitle>
              <CardDescription>Customize how CoinWise looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Interface Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable smooth transitions and animations
                  </p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="budget-alerts">Budget Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when you approach budget limits
                  </p>
                </div>
                <Switch id="budget-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="insight-alerts">Financial Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered financial tips and insights
                  </p>
                </div>
                <Switch id="insight-alerts" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Configure technical settings and security features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="encryption">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>End-to-End Encryption</span>
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt all your financial data
                  </p>
                </div>
                <Switch id="encryption" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blockchain">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span>Blockchain Integration</span>
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use blockchain technology for enhanced security
                  </p>
                </div>
                <Switch id="blockchain" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
