
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CreateEventFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: () => void;
  userId: string;
};

const CreateEventForm = ({ isOpen, onOpenChange, onEventCreated, userId }: CreateEventFormProps) => {
  const [newEvent, setNewEvent] = React.useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: ''
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('events').insert({
      ...newEvent,
      created_by: userId
    });

    if (error) {
      toast.error("Failed to create event", { description: error.message });
    } else {
      toast.success("Event created successfully!");
      onOpenChange(false);
      onEventCreated();
      setNewEvent({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: ''
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default CreateEventForm;
