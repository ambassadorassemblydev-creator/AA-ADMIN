import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/src/lib/supabase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const memberSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Pastor', 'Deacon', 'Deaconess', 'Elder', 'Minister', 'Bishop', 'Evangelist', 'Apostle', 'Prophet']).optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  marital_status: z.enum(["single", "married", "divorced", "widowed"]).optional(),
  occupation: z.string().optional(),
  address_line_1: z.string().optional(),
  city: z.string().optional(),
  status: z.enum(["active", "inactive", "on_leave"]),
});

type MemberFormValues = z.infer<typeof memberSchema>;

interface MemberFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MemberForm({ initialData, onSuccess, onCancel }: MemberFormProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.input<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
      title: "Mr",
      email: "",
      phone: "",
      status: "active",
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      if (initialData?.id) {
        const { error } = await supabase
          .from("profiles")
          .update(values)
          .eq("id", initialData.id);
        if (error) throw error;
        toast.success("Member updated successfully");
      } else {
        // For new members, we might need to handle auth or just profile creation
        // In this demo context, we'll assume profile creation is allowed
        const { error } = await supabase
          .from("profiles")
          .insert([{ ...values, id: crypto.randomUUID() }]); // Mocking ID for demo if auth isn't linked
        if (error) throw error;
        toast.success("Member added successfully");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Mr', 'Mrs', 'Ms', 'Dr', 'Pastor', 'Deacon', 'Deaconess', 'Elder', 'Minister', 'Bishop', 'Evangelist', 'Apostle', 'Prophet'].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+44..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
