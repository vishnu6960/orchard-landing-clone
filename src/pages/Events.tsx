
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import EventRegistrationForm from "@/components/EventRegistrationForm";
import CreateEventForm from "@/components/CreateEventForm";
import EventCard from "@/components/EventCard";

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
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
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

  const handleRegisterForEvent = (eventId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setSelectedEventId(eventId);
    setIsRegistrationFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 px-4 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          {user && (
            <Button onClick={() => setIsCreateDialogOpen(true)}>Create Event</Button>
          )}
        </div>
        
        {events.length === 0 ? (
          <p className="text-gray-600">No events available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onRegister={handleRegisterForEvent}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
      
      {user && (
        <CreateEventForm
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onEventCreated={fetchEvents}
          userId={user.id}
        />
      )}
      
      {selectedEventId && (
        <EventRegistrationForm 
          eventId={selectedEventId}
          isOpen={isRegistrationFormOpen}
          onOpenChange={setIsRegistrationFormOpen}
        />
      )}
    </div>
  );
};

export default Events;
