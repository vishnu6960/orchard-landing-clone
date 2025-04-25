
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const webinarSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  instructor: z.string().min(3, "Instructor name must be at least 3 characters"),
  duration: z.string().min(2, "Duration is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  zoom_link: z.string().url("Must be a valid URL"),
  meeting_id: z.string().min(3, "Meeting ID is required"),
  meeting_password: z.string().optional(),
  start_time: z.string().min(1, "Start time is required"),
  is_public: z.boolean().default(true),
});

type WebinarFormValues = z.infer<typeof webinarSchema>;

const AdminCreateWebinar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'admin' });
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      
      return data || false;
    },
    enabled: !!user,
  });

  // Form setup
  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(webinarSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      duration: "1 hour",
      level: "Beginner",
      zoom_link: "",
      meeting_id: "",
      meeting_password: "",
      start_time: "",
      is_public: true,
    },
  });

  // Create webinar mutation
  const createWebinarMutation = useMutation({
    mutationFn: async (values: WebinarFormValues) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('webinars')
        .insert([{
          ...values,
          created_by: user.id,
        }]);
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Webinar created successfully!");
      navigate("/webinars");
    },
    onError: (error) => {
      toast.error(`Failed to create webinar: ${error.message}`);
    },
  });

  const onSubmit = (values: WebinarFormValues) => {
    createWebinarMutation.mutate(values);
  };

  // Redirect if not admin
  useEffect(() => {
    if (!isCheckingAdmin && !isAdmin) {
      toast.error("You do not have permission to access this page");
      navigate("/");
    }
  }, [isAdmin, isCheckingAdmin, navigate]);

  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 px-4 max-w-[800px] mx-auto">
          <p className="text-center">Checking permissions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 px-4 max-w-[800px] mx-auto pb-16">
        <h1 className="text-3xl font-bold mb-6">Create New Webinar</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webinar Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter webinar title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the webinar content and what participants will learn"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="instructor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Instructor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1 hour, 45 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="zoom_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zoom Meeting Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://zoom.us/j/..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the full Zoom meeting URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="meeting_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Zoom Meeting ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="meeting_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Password (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Zoom Meeting Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Make this webinar public (visible to all users)
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/webinars")}>
                Cancel
              </Button>
              <Button type="submit" disabled={createWebinarMutation.isPending}>
                {createWebinarMutation.isPending ? "Creating..." : "Create Webinar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCreateWebinar;
