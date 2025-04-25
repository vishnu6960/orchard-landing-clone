
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

type Event = {
  id: string;
  title: string;
  description?: string;
  location: string;
  start_time: string;
  end_time: string;
  max_participants?: number;
  created_by: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });

    if (error) {
      toast.error("Failed to fetch events", { description: error.message });
    } else {
      setEvents(data || []);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to create an event");
      return;
    }

    const { data, error } = await supabase.from('events').insert({
      ...newEvent,
      created_by: user.id
    });

    if (error) {
      toast.error("Failed to create event", { description: error.message });
    } else {
      toast.success("Event created successfully!");
      setIsCreateDialogOpen(false);
      fetchEvents();
      setNewEvent({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: ''
      });
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { error } = await supabase.from('event_registrations').insert({
      event_id: eventId,
      user_id: user.id
    });

    if (error) {
      toast.error("Failed to register", { description: error.message });
    } else {
      toast.success("Successfully registered for the event!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 px-4 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          {user && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>Create Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input 
                      value={newEvent.title} 
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={newEvent.description} 
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} 
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input 
                      value={newEvent.location} 
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input 
                      type="datetime-local" 
                      value={newEvent.start_time} 
                      onChange={(e) => setNewEvent({...newEvent, start_time: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input 
                      type="datetime-local" 
                      value={newEvent.end_time} 
                      onChange={(e) => setNewEvent({...newEvent, end_time: e.target.value})} 
                      required 
                    />
                  </div>
                  <Button type="submit">Create Event</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        {events.length === 0 ? (
          <p className="text-gray-600">No events available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{event.description}</p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Start: {new Date(event.start_time).toLocaleString()}</p>
                    <p>End: {new Date(event.end_time).toLocaleString()}</p>
                  </div>
                  <Button 
                    onClick={() => handleRegisterForEvent(event.id)}
                    className="w-full"
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
