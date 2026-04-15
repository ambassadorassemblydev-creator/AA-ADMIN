import * as React from "react";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  User,
  MoreVertical,
  GripVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-blue-500" },
  { id: "in-progress", title: "In Progress", color: "bg-amber-500" },
  { id: "review", title: "Review", color: "bg-purple-500" },
  { id: "done", title: "Completed", color: "bg-emerald-500" },
];

const MOCK_TASKS = [
  { id: "1", title: "Prepare Sunday Sermon Slides", status: "todo", priority: "High", assignee: "Pastor John", dueDate: "2026-04-19" },
  { id: "2", title: "Update Media Gallery", status: "in-progress", priority: "Medium", assignee: "Sarah M.", dueDate: "2026-04-16" },
  { id: "3", title: "Coordinate Youth Outreach", status: "review", priority: "High", assignee: "David K.", dueDate: "2026-04-20" },
  { id: "4", title: "Financial Report Q1", status: "done", priority: "Medium", assignee: "Admin", dueDate: "2026-04-10" },
  { id: "5", title: "Website Maintenance", status: "todo", priority: "Low", assignee: "Tech Team", dueDate: "2026-04-25" },
];

export default function Tasks() {
  const [tasks, setTasks] = React.useState(MOCK_TASKS);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ClipboardList className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Departmental Tasks</h1>
          </div>
          <p className="text-muted-foreground font-medium">Coordinate internal operations and track progress across all church departments.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
          <Plus className="w-4 h-4" />
          Create Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                <h3 className="font-bold text-sm uppercase tracking-widest">{column.title}</h3>
                <Badge variant="outline" className="bg-muted/50 border-none text-[10px] font-bold">
                  {tasks.filter(t => t.status === column.id).length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 min-h-[500px] p-2 rounded-3xl bg-muted/20 border border-dashed border-border/50">
              {tasks.filter(t => t.status === column.id).map((task) => (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  className="bg-card p-4 rounded-2xl shadow-sm border border-border/50 group hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      className={cn(
                        "border-none text-[8px] font-bold uppercase px-2 py-0.5",
                        task.priority === "High" ? "bg-destructive/10 text-destructive" :
                        task.priority === "Medium" ? "bg-amber-500/10 text-amber-600" :
                        "bg-blue-500/10 text-blue-600"
                      )}
                    >
                      {task.priority} Priority
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <h4 className="text-sm font-bold mb-4 leading-tight">{task.title}</h4>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} />
                        <AvatarFallback className="text-[8px]">{task.assignee[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-bold text-muted-foreground">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[9px] font-bold">{task.dueDate}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground opacity-30">
                  <ClipboardList className="w-8 h-8 mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Empty</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
