
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminCreateWebinar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: "", 
    start_time: "",
    zoom_link: "",
    meeting_id: "",
    meeting_password: "",
    is_public: false
  });

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single();

        if (error || !data) {
          // Not an admin
          navigate("/");
          toast.error("You don't have permission to access this page");
          return;
        }

        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const { mutate: createWebinar, isPending } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      // Validate required fields
      const requiredFields = ["title", "description", "instructor", "duration", "level", "start_time", "zoom_link", "meeting_id"];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace("_", " ")} is required`);
        }
      }
      
      // Create webinar
      const { data, error } = await supabase
        .from("webinars")
        .insert({
          title: formData.title,
          description: formData.description,
          instructor: formData.instructor,
          duration: formData.duration,
          level: formData.level,
          start_time: formData.start_time,
          zoom_link: formData.zoom_link,
          meeting_id: formData.meeting_id,
          meeting_password: formData.meeting_password || null,
          created_by: user.id,
          is_public: formData.is_public
        })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Webinar created successfully");
      navigate("/webinars");
    },
    onError: (error: any) => {
      toast.error(`Failed to create webinar: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createWebinar();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_public: checked }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="container py-24">
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container py-24">
      <h1 className="text-3xl font-bold mb-8">Create New Webinar</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Webinar Details</CardTitle>
            <CardDescription>
              Enter the details for the new webinar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Introduction to React"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Learn the basics of React..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="1 hour"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Experience Level</Label>
                <Select 
                  value={formData.level}
                  onValueChange={(value) => handleSelectChange(value, "level")}
                  required
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                name="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="is_public">Public Webinar</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is_public"
                  checked={formData.is_public} 
                  onCheckedChange={handleSwitchChange} 
                />
                <Label htmlFor="is_public">
                  {formData.is_public ? "Visible to all users" : "Private webinar"}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zoom Meeting Details</CardTitle>
            <CardDescription>
              Enter the Zoom meeting information for this webinar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zoom_link">Zoom Meeting Link</Label>
              <Input
                id="zoom_link"
                name="zoom_link"
                value={formData.zoom_link}
                onChange={handleChange}
                placeholder="https://zoom.us/j/123456789"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_id">Meeting ID</Label>
              <Input
                id="meeting_id"
                name="meeting_id"
                value={formData.meeting_id}
                onChange={handleChange}
                placeholder="123 456 7890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_password">Meeting Password (Optional)</Label>
              <Input
                id="meeting_password"
                name="meeting_password"
                value={formData.meeting_password}
                onChange={handleChange}
                placeholder="password123"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="ml-auto">
              {isPending ? "Creating..." : "Create Webinar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AdminCreateWebinar;
