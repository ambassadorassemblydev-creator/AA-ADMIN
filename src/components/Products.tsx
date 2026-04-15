import * as React from "react";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Tag, 
  Package, 
  TrendingUp,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const MOCK_PRODUCTS = [
  { id: 1, name: "Velvet Matte Crimson", category: "Lipstick", price: 32, stock: 45, status: "Active", rating: 4.8, sales: 124 },
  { id: 2, name: "Glossy Nude Nectar", category: "Lip Gloss", price: 28, stock: 12, status: "Low Stock", rating: 4.9, sales: 89 },
  { id: 3, name: "Satin Rose Petal", category: "Lipstick", price: 34, stock: 0, status: "Out of Stock", rating: 4.7, sales: 56 },
  { id: 4, name: "Hydrating Lip Oil", category: "Treatment", price: 24, stock: 88, status: "Active", rating: 4.6, sales: 210 },
  { id: 5, name: "Precision Lip Liner", category: "Liner", price: 18, stock: 156, status: "Active", rating: 4.5, sales: 145 },
];

export default function Products() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Momoh Beauty Catalog</h1>
          </div>
          <p className="text-muted-foreground font-medium">Manage your luxury lip beauty collection, inventory, and sales performance.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Package className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-bold">+12%</Badge>
          </div>
          <p className="text-2xl font-black">248</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Products</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-bold">+5.4%</Badge>
          </div>
          <p className="text-2xl font-black">$12,450</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Monthly Revenue</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-600">
              <Star className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-none text-[8px] font-bold">TOP RATED</Badge>
          </div>
          <p className="text-2xl font-black">4.8</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg. Rating</p>
        </Card>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-600">
              <Eye className="w-5 h-5" />
            </div>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-none text-[8px] font-bold">TRENDING</Badge>
          </div>
          <p className="text-2xl font-black">1.2k</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Catalog Views</p>
        </Card>
      </div>

      <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 h-11 rounded-2xl bg-background/50 border-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-11 gap-2 border-none bg-background/50 text-[10px] font-bold uppercase tracking-widest">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="rounded-xl h-11 gap-2 border-none bg-background/50 text-[10px] font-bold uppercase tracking-widest">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/10">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Product</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stock</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sales</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PRODUCTS.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Tag className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-muted/50 border-none text-[10px] font-bold uppercase">{product.category}</Badge>
                    </td>
                    <td className="p-4 font-bold text-sm">${product.price}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold">{product.stock} units</span>
                        <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              product.stock > 20 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-destructive"
                            )} 
                            style={{ width: `${Math.min(100, (product.stock / 200) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={cn(
                          "border-none text-[10px] font-bold uppercase px-2 py-0.5",
                          product.status === "Active" ? "bg-emerald-500/10 text-emerald-600" :
                          product.status === "Low Stock" ? "bg-amber-500/10 text-amber-600" :
                          "bg-destructive/10 text-destructive"
                        )}
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{product.sales}</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-xs font-medium">
                            <Edit2 className="w-3.5 h-3.5" /> Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs font-medium text-destructive">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
