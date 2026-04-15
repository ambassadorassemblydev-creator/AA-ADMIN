import * as React from "react";
import { 
  Cake, 
  Gift, 
  Calendar, 
  Search, 
  Filter, 
  Bell, 
  Mail, 
  Phone, 
  MoreVertical, 
  Star,
  PartyPopper,
  ChevronRight,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const MOCK_MILESTONES = [
  { id: 1, name: "Pastor Chris", type: "Birthday", date: "Today", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris", status: "Active" },
  { id: 2, name: "Sarah & Mark", type: "Anniversary", date: "Tomorrow", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahMark", status: "Active" },
  { id: 3, name: "David Wilson", type: "Birthday", date: "Apr 18", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", status: "Upcoming" },
  { id: 4, name: "The O'Neils", type: "Anniversary", date: "Apr 20", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oneil", status: "Upcoming" },
  { id: 5, name: "Emily Brown", type: "Birthday", date: "Apr 22", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", status: "Upcoming" },
];

export default function Milestones() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <PartyPopper className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Member Milestones</h1>
          </div>
          <p className="text-muted-foreground font-medium">Celebrate birthdays, anniversaries, and special achievements within the Ambassadors Assembly community.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
          <Bell className="w-4 h-4" />
          Manage Notifications
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList className="bg-muted/20 p-1 rounded-2xl h-12 border border-border/50 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <TabsTrigger value="all" className="flex-1 sm:flex-none rounded-xl px-6 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="birthdays" className="flex-1 sm:flex-none rounded-xl px-6 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">Birthdays</TabsTrigger>
                <TabsTrigger value="anniversaries" className="flex-1 sm:flex-none rounded-xl px-6 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">Anniversaries</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search members..." className="pl-10 h-11 rounded-2xl bg-card/50 backdrop-blur-xl border-none shadow-sm w-full" />
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {MOCK_MILESTONES.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card/50 backdrop-blur-xl p-4 rounded-3xl shadow-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-muted/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-4 border-background shadow-lg shrink-0">
                      <AvatarImage src={item.image} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base truncate">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn(
                          "border-none text-[8px] font-bold uppercase tracking-widest",
                          item.type === "Birthday" ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                        )}>
                          {item.type}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button className="rounded-xl h-10 px-4 font-bold uppercase tracking-widest text-[10px] gap-2 flex-1 sm:flex-none">
                      <Gift className="w-4 h-4" />
                      <span className="hidden xs:inline">Send Gift</span>
                      <span className="xs:hidden">Gift</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Cake className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black leading-tight">Pastor Chris's Birthday</h3>
                <p className="text-sm font-medium opacity-90">Today is a special day! Join us in celebrating our Lead Pastor's birthday.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" className="w-full rounded-2xl h-12 font-bold uppercase tracking-widest text-[10px]">
                  Send a Message
                </Button>
                <Button variant="ghost" className="w-full rounded-2xl h-12 font-bold uppercase tracking-widest text-[10px] text-white hover:bg-white/10">
                  View Tribute Wall
                </Button>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          </Card>

          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Upcoming Milestones</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Next 30 days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center font-bold text-xs">
                        {18 + i}
                      </div>
                      <div>
                        <p className="text-sm font-bold">Member Name</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Birthday</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border/50">
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest h-8">View Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
