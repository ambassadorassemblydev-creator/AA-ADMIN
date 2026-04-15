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
  GripVertical,
  Filter,
  Download,
  Trash2,
  CheckSquare,
  MessageSquare,
  History as HistoryIcon,
  Archive,
  ChevronRight,
  ArrowRight,
  Edit2,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import TaskForm from "./forms/TaskForm";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-blue-500", shadow: "shadow-blue-500/20" },
  { id: "in-progress", title: "In Progress", color: "bg-amber-500", shadow: "shadow-amber-500/20" },
  { id: "review", title: "Review", color: "bg-purple-500", shadow: "shadow-purple-500/20" },
  { id: "done", title: "Completed", color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
];

const INITIAL_TASKS = [
  { 
    id: "1", 
    title: "Prepare Sunday Sermon Slides", 
    description: "Create visual aids for the upcoming sermon on 'Faith and Perseverance'. Include key scriptures and high-quality images.",
    status: "todo", 
    priority: "High", 
    assignee: "Pastor John", 
    dueDate: "2026-04-19",
    category: "Ministry",
    subtasks: [
      { id: "s1", title: "Gather scriptures", completed: true },
      { id: "s2", title: "Find background images", completed: false },
      { id: "s3", title: "Review with Media Team", completed: false },
    ],
    comments: [
      { id: "c1", user: "Sarah M.", text: "I have some high-res photos from the last outreach if you need them.", date: "2026-04-14" }
    ]
  },
  { 
    id: "2", 
    title: "Update Media Gallery", 
    description: "Upload photos from the Easter service to the website and social media platforms.",
    status: "in-progress", 
    priority: "Medium", 
    assignee: "Sarah M.", 
    dueDate: "2026-04-16",
    category: "Media",
    subtasks: [
      { id: "s4", title: "Select best photos", completed: true },
      { id: "s5", title: "Edit and resize", completed: true },
      { id: "s6", title: "Upload to website", completed: false },
    ],
    comments: []
  },
  { 
    id: "3", 
    title: "Coordinate Youth Outreach", 
    description: "Plan the logistics for the Saturday community outreach program. Need to confirm transportation and food.",
    status: "review", 
    priority: "High", 
    assignee: "David K.", 
    dueDate: "2026-04-20",
    category: "Outreach",
    subtasks: [],
    comments: []
  },
  { 
    id: "4", 
    title: "Financial Report Q1", 
    description: "Compile all departmental expenses and income for the first quarter of 2026.",
    status: "done", 
    priority: "Medium", 
    assignee: "Admin", 
    dueDate: "2026-04-10",
    category: "Finance",
    subtasks: [
      { id: "s7", title: "Gather receipts", completed: true },
      { id: "s8", title: "Reconcile bank statements", completed: true },
      { id: "s9", title: "Generate PDF report", completed: true },
    ],
    comments: []
  },
];

export default function Tasks() {
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const [search, setSearch] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("All");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<any>(null);
  const [viewingTask, setViewingTask] = React.useState<any>(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                         task.assignee.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleCreateTask = (data: any) => {
    const newTask = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      dueDate: data.dueDate.toISOString().split('T')[0],
      subtasks: [],
      comments: []
    };
    setTasks([...tasks, newTask]);
    setIsCreateOpen(false);
    toast.success("Task created successfully!");
  };

  const handleUpdateTask = (data: any) => {
    setTasks(tasks.map(t => t.id === editingTask.id ? { 
      ...t, 
      ...data, 
      dueDate: data.dueDate instanceof Date ? data.dueDate.toISOString().split('T')[0] : data.dueDate 
    } : t));
    setEditingTask(null);
    toast.success("Task updated!");
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error("Task deleted");
  };

  const handleMoveTask = (id: string, newStatus: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    toast.info(`Task moved to ${newStatus.replace('-', ' ')}`);
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s)
        };
      }
      return t;
    }));
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(t => t.status === 'done').length;
    if (completedCount === 0) return;
    setTasks(tasks.filter(t => t.status !== 'done'));
    toast.success(`Cleared ${completedCount} completed tasks`);
  };

  const exportTasks = () => {
    const csv = [
      ["ID", "Title", "Status", "Priority", "Assignee", "Due Date", "Category"],
      ...tasks.map(t => [t.id, t.title, t.status, t.priority, t.assignee, t.dueDate, t.category])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Tasks exported to CSV");
  };

  const getProgress = (task: any) => {
    if (!task.subtasks || task.subtasks.length === 0) return task.status === 'done' ? 100 : 0;
    const completed = task.subtasks.filter((s: any) => s.completed).length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  const isOverdue = (date: string) => {
    return new Date(date) < new Date(new Date().setHours(0,0,0,0)) && date !== "";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20">
              <ClipboardList className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">Departmental Tasks</h1>
              <p className="text-muted-foreground font-medium text-sm">Coordinate internal operations and track progress across all church departments.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="rounded-2xl h-12 px-5 font-bold uppercase tracking-widest text-[10px] gap-2 border-none bg-card/50 backdrop-blur-xl shadow-xl"
            onClick={exportTasks}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tighter">New Task</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Add a new operational task to the board</DialogDescription>
              </DialogHeader>
              <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/30 p-4 rounded-3xl backdrop-blur-xl border border-white/5">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks or assignees..." 
            className="pl-12 h-12 rounded-2xl bg-background/50 border-none shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2 shrink-0">Priority:</span>
          {["All", "High", "Medium", "Low"].map((p) => (
            <Button
              key={p}
              variant={priorityFilter === p ? "default" : "outline"}
              size="sm"
              className="rounded-xl h-9 px-4 text-[10px] font-bold uppercase tracking-widest border-none bg-muted/30 shrink-0"
              onClick={() => setPriorityFilter(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", column.color, column.shadow)} />
                <h3 className="font-black text-sm uppercase tracking-tighter">{column.title}</h3>
                <Badge variant="outline" className="bg-primary/10 text-primary border-none text-[10px] font-black rounded-lg px-2">
                  {filteredTasks.filter(t => t.status === column.id).length}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                {column.id === 'done' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearCompleted}
                    title="Clear Completed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsCreateOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 min-h-[600px] p-4 rounded-[2rem] bg-muted/10 border-2 border-dashed border-border/30 backdrop-blur-sm">
              <AnimatePresence mode="popLayout">
                {filteredTasks.filter(t => t.status === column.id).map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-card p-5 rounded-3xl shadow-xl shadow-black/5 border border-white/5 group hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col gap-1.5">
                        <Badge 
                          className={cn(
                            "border-none text-[8px] font-black uppercase px-2 py-0.5 w-fit rounded-lg",
                            task.priority === "High" || task.priority === "Urgent" ? "bg-destructive/10 text-destructive" :
                            task.priority === "Medium" ? "bg-amber-500/10 text-amber-600" :
                            "bg-blue-500/10 text-blue-600"
                          )}
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{task.category}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2">
                          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1.5">Task Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setViewingTask(task)} className="rounded-xl gap-2 cursor-pointer">
                            <Search className="w-4 h-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingTask(task)} className="rounded-xl gap-2 cursor-pointer">
                            <Edit2 className="w-4 h-4" /> Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1.5">Move To</DropdownMenuLabel>
                          {COLUMNS.filter(c => c.id !== task.status).map(col => (
                            <DropdownMenuItem key={col.id} onClick={() => handleMoveTask(task.id, col.id)} className="rounded-xl gap-2 cursor-pointer">
                              <ArrowRight className="w-4 h-4" /> {col.title}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="rounded-xl gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <h4 className="text-sm font-black mb-4 leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => setViewingTask(task)}>
                      {task.title}
                    </h4>

                    {task.subtasks.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Progress</span>
                          <span>{getProgress(task)}%</span>
                        </div>
                        <Progress value={getProgress(task)} className="h-1.5 rounded-full bg-muted" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border-2 border-background shadow-lg">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} />
                          <AvatarFallback className="text-[8px] font-black">{task.assignee[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{task.assignee}</span>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-lg",
                        isOverdue(task.dueDate) && task.status !== 'done' ? "bg-destructive/10 text-destructive" : "text-muted-foreground"
                      )}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black">{task.dueDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground/30">
                  <div className="w-16 h-16 rounded-3xl bg-muted/20 flex items-center justify-center mb-4">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">No Tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter">Edit Task</DialogTitle>
            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Update task details and assignments</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <TaskForm 
              initialData={editingTask} 
              onSubmit={handleUpdateTask} 
              onCancel={() => setEditingTask(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={!!viewingTask} onOpenChange={(open) => !open && setViewingTask(null)}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
          {viewingTask && (
            <div className="flex flex-col h-full max-h-[90vh]">
              <div className="p-8 bg-gradient-to-br from-primary/10 via-background to-background border-b border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase px-3 py-1 rounded-xl">
                    {viewingTask.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => { setEditingTask(viewingTask); setViewingTask(null); }}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setViewingTask(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h2 className="text-3xl font-black tracking-tighter mb-4">{viewingTask.title}</h2>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${viewingTask.assignee}`} />
                      <AvatarFallback>{viewingTask.assignee[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assignee</p>
                      <p className="text-sm font-black">{viewingTask.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Due Date</p>
                      <p className="text-sm font-black">{viewingTask.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", 
                      viewingTask.priority === 'High' ? "bg-destructive/10 text-destructive" : "bg-blue-500/10 text-blue-600"
                    )}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Priority</p>
                      <p className="text-sm font-black">{viewingTask.priority}</p>
                    </div>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-8 space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Description</h4>
                    <p className="text-sm leading-relaxed font-medium text-foreground/80">
                      {viewingTask.description || "No description provided for this task."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Subtasks ({viewingTask.subtasks.filter((s:any) => s.completed).length}/{viewingTask.subtasks.length})</h4>
                      <span className="text-[10px] font-black text-primary">{getProgress(viewingTask)}%</span>
                    </div>
                    <Progress value={getProgress(viewingTask)} className="h-2 rounded-full bg-muted" />
                    <div className="space-y-2">
                      {viewingTask.subtasks.map((sub: any) => (
                        <div 
                          key={sub.id} 
                          className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-white/5 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => toggleSubtask(viewingTask.id, sub.id)}
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                            sub.completed ? "bg-primary border-primary" : "border-muted-foreground/30"
                          )}>
                            {sub.completed && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <span className={cn("text-sm font-bold", sub.completed && "line-through text-muted-foreground")}>{sub.title}</span>
                        </div>
                      ))}
                      {viewingTask.subtasks.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">No subtasks added.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Comments</h4>
                    <div className="space-y-4">
                      {viewingTask.comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} />
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 p-4 rounded-2xl bg-muted/30 border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-black uppercase tracking-tighter">{comment.user}</span>
                              <span className="text-[9px] text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-3 pt-2">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Me`} />
                          <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 relative">
                          <Input placeholder="Write a comment..." className="h-10 rounded-xl bg-muted/30 border-none pr-10 text-xs" />
                          <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-lg">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 bg-muted/20 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HistoryIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Last updated 2 hours ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-10 px-4 text-[10px] font-bold uppercase tracking-widest border-none bg-background/50">
                    <Archive className="w-4 h-4 mr-2" /> Archive
                  </Button>
                  <Button className="rounded-xl h-10 px-6 font-bold uppercase tracking-widest text-[10px]" onClick={() => setViewingTask(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
