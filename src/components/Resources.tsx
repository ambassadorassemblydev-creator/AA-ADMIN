import * as React from "react";
import { 
  Library, 
  Search, 
  Filter, 
  FileText, 
  Video, 
  Music, 
  Download, 
  MoreVertical, 
  Plus, 
  Folder, 
  Grid, 
  List,
  Eye,
  Share2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const MOCK_RESOURCES = [
  { id: 1, name: "Ambassadors Brand Guidelines 2026", type: "PDF", size: "4.2 MB", category: "Brand", date: "2026-03-15", access: "Public" },
  { id: 2, name: "Sunday Service Stream Template", type: "Video", size: "128 MB", category: "Media", date: "2026-04-01", access: "Restricted" },
  { id: 3, name: "Worship Team Rehearsal Audio", type: "Audio", size: "12 MB", category: "Worship", date: "2026-04-10", access: "Internal" },
  { id: 4, name: "Ministry Outreach Flyer", type: "Image", size: "2.1 MB", category: "Outreach", date: "2026-04-12", access: "Public" },
  { id: 5, name: "Church Constitution v2.4", type: "PDF", size: "1.5 MB", category: "Admin", date: "2026-01-20", access: "Restricted" },
];

export default function Resources() {
  const [view, setView] = React.useState<"grid" | "list">("grid");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Library className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Resource Center</h1>
          </div>
          <p className="text-muted-foreground font-medium">Access and manage digital assets, brand materials, and ministry resources.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-2xl h-12 px-4 gap-2 border-none bg-card/50 backdrop-blur-xl shadow-sm">
            <Folder className="w-4 h-4" />
            New Folder
          </Button>
          <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
            <Plus className="w-4 h-4" />
            Upload File
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Storage</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">System capacity usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Used Space</span>
                  <span>4.2 GB / 10 GB</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-muted/30 text-center">
                  <p className="text-lg font-black">1.2k</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Files</p>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 text-center">
                  <p className="text-lg font-black">45</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Folders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "All Assets", icon: Library },
                { label: "Documents", icon: FileText },
                { label: "Videos", icon: Video },
                { label: "Audio", icon: Music },
                { label: "Recent", icon: Clock },
              ].map((item) => (
                <Button 
                  key={item.label} 
                  variant="ghost" 
                  className="w-full justify-start gap-3 rounded-xl h-11 px-4 font-bold text-xs hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-10 h-12 rounded-2xl bg-card/50 backdrop-blur-xl border-none shadow-sm" />
            </div>
            <div className="flex items-center bg-card/50 backdrop-blur-xl p-1 rounded-2xl shadow-sm border border-border/50">
              <Button 
                variant={view === "grid" ? "secondary" : "ghost"} 
                size="icon" 
                className="rounded-xl h-10 w-10"
                onClick={() => setView("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={view === "list" ? "secondary" : "ghost"} 
                size="icon" 
                className="rounded-xl h-10 w-10"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-4",
            view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {MOCK_RESOURCES.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "bg-card/50 backdrop-blur-xl rounded-3xl shadow-xl border border-border/50 group transition-all overflow-hidden",
                  view === "list" ? "flex items-center p-4 gap-4" : "p-6"
                )}
              >
                <div className={cn(
                  "rounded-2xl flex items-center justify-center shrink-0",
                  file.type === "PDF" ? "bg-red-500/10 text-red-600" :
                  file.type === "Video" ? "bg-blue-500/10 text-blue-600" :
                  file.type === "Audio" ? "bg-amber-500/10 text-amber-600" :
                  "bg-purple-500/10 text-purple-600",
                  view === "list" ? "w-12 h-12" : "w-16 h-16 mb-4"
                )}>
                  {file.type === "PDF" ? <FileText className="w-8 h-8" /> :
                   file.type === "Video" ? <Video className="w-8 h-8" /> :
                   file.type === "Audio" ? <Music className="w-8 h-8" /> :
                   <Library className="w-8 h-8" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm truncate">{file.name}</h4>
                    {file.access === "Restricted" && <Lock className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>{file.size}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span>{file.date}</span>
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-2",
                  view === "grid" ? "mt-6 pt-4 border-t border-border/50 justify-between" : "ml-4"
                )}>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="bg-muted/50 border-none text-[8px] font-bold uppercase tracking-widest">
                    {file.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

import { Clock } from "lucide-react";
