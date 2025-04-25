import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Calendar, Clock, User, Plus } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import WebinarRegistrationForm from "@/components/WebinarRegistrationForm";

type Webinar = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  start_time: string;
  zoom_link: string;
  meeting_id: string;
  meeting_password: string | null;
  is_public: boolean;
};

const Webinars = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [registrationWebinar, setRegistrationWebinar] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    enabled: !!user
  });

  // Fetch webinars
  const { data: webinars, isLoading, error } = useQuery({
    queryKey: ['webinars'],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('start_time', { ascending: true });
        
      if (error) throw error;
      return data as Webinar[];
    },
    enabled: !!user
  });

  // Fetch user registrations
  const { data: registrations } = useQuery({
    queryKey: ['webinarRegistrations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('webinar_registrations')
        .select('webinar_id')
        .eq('user_id', user.id);
        
      if (error) {
        console.error("Error fetching registrations:", error);
        return [];
      }
      
      return data.map(reg => reg.webinar_id);
    },
    enabled: !!user
  });

  // Register for webinar mutation
  const registerMutation = useMutation({
    mutationFn: async (webinarId: string) => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('webinar_registrations')
        .insert([{ webinar_id: webinarId, user_id: user.id }]);
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webinarRegistrations'] });
      toast.success("Successfully registered for the webinar!");
      setRegistrationWebinar(null);
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    }
  });

  // Filter webinars based on selected level
  const filteredWebinars = selectedLevel === "all" 
    ? webinars 
    : webinars?.filter(webinar => webinar.level.toLowerCase() === selectedLevel.toLowerCase());

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 px-4 max-w-[1200px] mx-auto">
          <p className="text-center">Loading webinars...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error("Error loading webinars:", error);
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 px-4 max-w-[1200px] mx-auto">
          <p className="text-center text-red-500">Error loading webinars. Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isRegistered = (webinarId: string) => {
    return registrations?.includes(webinarId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 px-4 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Webinars</h1>
            <p className="text-gray-600">Enhance your skills with our expert-led webinars</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button 
              variant={selectedLevel === "all" ? "default" : "outline"}
              onClick={() => setSelectedLevel("all")}
            >
              All
            </Button>
            <Button 
              variant={selectedLevel === "beginner" ? "default" : "outline"}
              onClick={() => setSelectedLevel("beginner")}
            >
              Beginner
            </Button>
            <Button 
              variant={selectedLevel === "intermediate" ? "default" : "outline"}
              onClick={() => setSelectedLevel("intermediate")}
            >
              Intermediate
            </Button>
            <Button 
              variant={selectedLevel === "advanced" ? "default" : "outline"}
              onClick={() => setSelectedLevel("advanced")}
            >
              Advanced
            </Button>
            
            {isAdmin && (
              <Button 
                variant="default" 
                onClick={() => navigate("/admin/webinars/create")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Webinar
              </Button>
            )}
          </div>
        </div>

        {filteredWebinars && filteredWebinars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredWebinars.map((webinar) => (
              <Card key={webinar.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{webinar.title}</CardTitle>
                      <CardDescription className="text-sm">
                        <div className="flex items-center mb-1">
                          <User className="h-3.5 w-3.5 mr-1" />
                          {webinar.instructor}
                        </div>
                        <div className="flex items-center mb-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {webinar.duration}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {format(new Date(webinar.start_time), "PPp")}
                        </div>
                      </CardDescription>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      webinar.level === "Beginner" ? "bg-green-100 text-green-700" :
                      webinar.level === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {webinar.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4 flex-1">{webinar.description}</p>
                  {isRegistered(webinar.id) ? (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(webinar.zoom_link, "_blank")}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Join Webinar
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => setRegistrationWebinar(webinar.id)}
                    >
                      Register
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No webinars found for the selected level.</p>
          </div>
        )}
      </div>
      
      {/* Webinar Registration Modal */}
      {registrationWebinar && (
        <WebinarRegistrationForm
          webinarId={registrationWebinar}
          isOpen={!!registrationWebinar}
          onOpenChange={() => setRegistrationWebinar(null)}
          onRegister={() => {
            registerMutation.mutate(registrationWebinar);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Webinars;
