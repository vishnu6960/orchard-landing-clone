
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EventRegistrationFormProps = {
  eventId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const EventRegistrationForm = ({ eventId, isOpen, onOpenChange }: EventRegistrationFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ 
          event_id: eventId,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      toast.success("Successfully registered for the event!");
      onOpenChange(false);
      navigate('/webinars');
    } catch (error) {
      toast.error("Failed to register for the event");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event Registration</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">Complete Registration</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;
