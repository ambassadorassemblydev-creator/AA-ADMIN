import * as React from "react";
import { 
  Settings, 
  Shield, 
  ShieldCheck,
  Database, 
  Globe, 
  Mail, 
  Smartphone,
  Users,
  Lock,
  Eye,
  Save,
  Plus,
  History,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  MoreVertical,
  Edit2,
  Trash2,
  Key,
  Server,
  Cloud,
  Search,
  Download,
  Palette,
  Sun,
  Moon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/src/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";

import { useAuth } from "@/src/contexts/AuthContext";

export default function AdminControls({ defaultTab = "general" }: { defaultTab?: string }) {
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [auditLogs, setAuditLogs] = React.useState<any[]>([]);
  const [roles, setRoles] = React.useState<any[]>([]);
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const fetchAdminData = async (retries = 3) => {
    setLoading(true);
    try {
      const [
        { data: logsData },
        { data: rolesData }
      ] = await Promise.all([
        supabase.from('audit_log').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('roles').select('*')
      ]);

      setAuditLogs(logsData || []);
      setRoles(rolesData || []);
    } catch (error: any) {
      if (error?.message?.includes("Lock") && retries > 0) {
        setTimeout(() => fetchAdminData(retries - 1), 500);
        return;
      }
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!authLoading) {
      fetchAdminData();
    }
  }, [authLoading]);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Admin Controls</h1>
        </div>
        <p className="text-muted-foreground font-medium">Manage church-wide settings, user roles, and system configurations for Ambassadors Assembly.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <TabsList className="grid w-full grid-cols-5 lg:w-[750px] h-12 p-1 bg-muted/50 rounded-xl mb-4 sm:mb-8 min-w-[500px] sm:min-w-0">
            <TabsTrigger value="general" className="rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
              <Server className="w-4 h-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="rounded-lg text-[10px] font-bold uppercase tracking-widest gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Church Information</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Basic details about Ambassadors Assembly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Church Name</Label>
                    <Input className="h-11 rounded-xl bg-background/50 border-none" defaultValue="The Ambassadors Assembly" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Denomination</Label>
                    <Select defaultValue="non-denominational">
                      <SelectTrigger className="h-11 rounded-xl bg-background/50 border-none">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-denominational">Non-Denominational</SelectItem>
                        <SelectItem value="baptist">Baptist</SelectItem>
                        <SelectItem value="pentecostal">Pentecostal</SelectItem>
                        <SelectItem value="anglican">Anglican</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Official Website</Label>
                  <Input className="h-11 rounded-xl bg-background/50 border-none" defaultValue="https://ambassadorsassembly.org" />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t bg-muted/5">
                <Button onClick={handleSave} className="ml-auto gap-2 rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Communication Channels</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Configure member outreach methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send automated emails for events and news.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">Send urgent updates via text message.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Role Management</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Define and manage permissions</CardDescription>
              </div>
              <Button className="gap-2 h-9 rounded-xl">
                <Plus className="w-4 h-4" />
                Add Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.length === 0 ? (
                  [
                    { name: "Admin", description: "Full system access", color: "bg-primary" },
                    { name: "Leader", description: "Ministry management", color: "bg-blue-500" },
                    { name: "Member", description: "Basic access", color: "bg-muted-foreground" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 rounded-2xl border bg-background/40 hover:bg-background/60 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-1.5 h-10 rounded-full", item.color)} />
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">{item.name}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-4 rounded-2xl border bg-background/40 hover:bg-background/60 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-10 rounded-full bg-primary" />
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">{role.name}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{role.description || 'No description'}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Manage</Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <div className="grid gap-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Visual Identity</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Customize the look and feel of Ambassadors Assembly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Interface Mode</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-24 rounded-2xl flex-col gap-3 border-2 border-primary bg-primary/5">
                        <Sun className="w-6 h-6 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Light Mode</span>
                      </Button>
                      <Button variant="outline" className="h-24 rounded-2xl flex-col gap-3 border-none bg-muted/30">
                        <Moon className="w-6 h-6 text-muted-foreground" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Dark Mode</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Brand Color</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {["#10b981", "#3b82f6", "#8b5cf6", "#f43f5e"].map((color) => (
                        <div 
                          key={color} 
                          className={cn(
                            "h-12 rounded-xl cursor-pointer transition-all hover:scale-110",
                            color === "#10b981" ? "ring-2 ring-primary ring-offset-2" : ""
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Glassmorphism Effects</Label>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Enable backdrop blur on cards and sidebars</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Smooth Animations</Label>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Enable motion transitions across the interface</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 border-t border-border/50 p-6">
                <Button className="rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[10px] ml-auto" onClick={handleSave}>
                  Apply Theme
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-none shadow-md bg-emerald-500/10 text-emerald-600 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-5 h-5" />
                  <Badge variant="outline" className="bg-emerald-500/20 border-none text-emerald-700 text-[10px] font-bold">HEALTHY</Badge>
                </div>
                <p className="text-2xl font-black">99.9%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">System Uptime</p>
              </Card>
              <Card className="border-none shadow-md bg-blue-500/10 text-blue-600 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <Server className="w-5 h-5" />
                  <Badge variant="outline" className="bg-blue-500/20 border-none text-blue-700 text-[10px] font-bold">STABLE</Badge>
                </div>
                <p className="text-2xl font-black">42ms</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Server Latency</p>
              </Card>
              <Card className="border-none shadow-md bg-amber-500/10 text-amber-600 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <Database className="w-5 h-5" />
                  <Badge variant="outline" className="bg-amber-500/20 border-none text-amber-700 text-[10px] font-bold">OPTIMIZED</Badge>
                </div>
                <p className="text-2xl font-black">1.2GB</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">DB Storage</p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Backup & Restore</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Manage system backups and data recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Automated Daily Backups</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Last backup: Today at 03:00 AM</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl gap-2 border-none bg-muted/50 text-[10px] font-bold uppercase tracking-widest">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl gap-2 border-none bg-muted/50 text-[10px] font-bold uppercase tracking-widest">
                      <History className="w-4 h-4" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Security & API</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Manage keys and access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Supabase URL</Label>
                    <div className="relative">
                      <Input className="h-11 rounded-xl bg-background/50 border-none pr-10" value="https://ambassadors-assembly.supabase.co" readOnly />
                      <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl h-11 font-bold uppercase tracking-widest text-[10px] border-none bg-muted/50">
                    Rotate API Keys
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Audit Logs</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Track administrative actions</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input placeholder="Filter logs..." className="h-9 pl-9 w-64 bg-background/50 border-none rounded-xl" />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-none bg-background/50">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.length === 0 ? (
                  [
                    { action: "User Login", user: "admin@ambassadors.org", time: "2 mins ago", status: "Success" },
                    { action: "Role Updated", user: "admin@ambassadors.org", time: "15 mins ago", status: "Success" },
                    { action: "Failed Login", user: "unknown@ip.address", time: "1 hour ago", status: "Warning" },
                    { action: "Sermon Deleted", user: "pastor.john@ambassadors.org", time: "3 hours ago", status: "Success" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border bg-background/40 hover:bg-background/60 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                          log.status === "Success" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                        )}>
                          {log.status === "Success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold">{log.action}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl border bg-background/40 hover:bg-background/60 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold">{log.action}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.user_id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="ghost" className="w-full justify-between group/btn px-0 hover:bg-transparent">
                <span className="text-xs font-bold uppercase tracking-widest">View Full Audit History</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
