import * as React from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  Star,
  Award,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const MOCK_VOLUNTEERS = [
  { id: 1, name: "Michael Chen", role: "Lead Usher", department: "Logistics", hours: 124, status: "Active", rating: 4.9 },
  { id: 2, name: "Sarah Williams", role: "Choir Member", department: "Worship", hours: 86, status: "Active", rating: 4.8 },
  { id: 3, name: "James Wilson", role: "Camera Op", department: "Media", hours: 45, status: "On Leave", rating: 4.7 },
  { id: 4, name: "Linda Garcia", role: "Sunday School", department: "Youth", hours: 210, status: "Active", rating: 5.0 },
  { id: 5, name: "Robert Taylor", role: "Security", department: "Logistics", hours: 15, status: "New", rating: 4.5 },
];

export default function Volunteers() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Volunteer Management</h1>
          </div>
          <p className="text-muted-foreground font-medium">Coordinate your dedicated workforce, track service hours, and recognize outstanding contributions.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
          <UserPlus className="w-4 h-4" />
          Recruit Volunteer
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Users className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-bold">+5 NEW</Badge>
          </div>
          <p className="text-2xl font-black">156</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Volunteers</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-bold">THIS MONTH</Badge>
          </div>
          <p className="text-2xl font-black">1,240</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Hours</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-600">
              <Award className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-none text-[8px] font-bold">TOP TIER</Badge>
          </div>
          <p className="text-2xl font-black">12</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead Volunteers</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-600">
              <Star className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-none text-[8px] font-bold">EXCELLENT</Badge>
          </div>
          <p className="text-2xl font-black">4.9</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Satisfaction Rate</p>
        </Card>
      </div>

      <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search volunteers..." className="pl-10 h-11 rounded-2xl bg-background/50 border-none" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-11 gap-2 border-none bg-background/50 text-[10px] font-bold uppercase tracking-widest">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="rounded-xl h-11 gap-2 border-none bg-background/50 text-[10px] font-bold uppercase tracking-widest">
                Schedule
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/10">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Volunteer</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hours</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rating</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VOLUNTEERS.map((v) => (
                  <tr key={v.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${v.name}`} />
                          <AvatarFallback>{v.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-sm">{v.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-muted/50 border-none text-[10px] font-bold uppercase">{v.department}</Badge>
                    </td>
                    <td className="p-4 font-medium text-sm">{v.role}</td>
                    <td className="p-4 font-bold text-sm">{v.hours}h</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{v.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={cn(
                          "border-none text-[10px] font-bold uppercase px-2 py-0.5",
                          v.status === "Active" ? "bg-emerald-500/10 text-emerald-600" :
                          v.status === "On Leave" ? "bg-amber-500/10 text-amber-600" :
                          "bg-blue-500/10 text-blue-600"
                        )}
                      >
                        {v.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
