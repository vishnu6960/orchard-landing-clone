
import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type WebinarRegistrationFormProps = {
  webinarId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: () => void;
};

type Webinar = {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  start_time: string;
  level: string;
};

const WebinarRegistrationForm = ({
  webinarId,
  isOpen,
  onOpenChange,
  onRegister,
}: WebinarRegistrationFormProps) => {
  const { data: webinar, isLoading } = useQuery({
    queryKey: ["webinar", webinarId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("webinars")
        .select("id, title, instructor, duration, start_time, level")
        .eq("id", webinarId)
        .single();

      if (error) throw error;
      return data as Webinar;
    },
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Webinar Registration</DialogTitle>
          <DialogDescription>
            Register for this webinar to receive the joining link and reminders.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-4 text-center">Loading webinar details...</div>
        ) : webinar ? (
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-semibold text-lg">{webinar.title}</h3>
              <p className="text-muted-foreground">
                Instructor: {webinar.instructor}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Date & Time</p>
                <p>{format(new Date(webinar.start_time), "PPpp")}</p>
              </div>
              <div>
                <p className="font-medium">Duration</p>
                <p>{webinar.duration}</p>
              </div>
              <div>
                <p className="font-medium">Level</p>
                <p>{webinar.level}</p>
              </div>
            </div>

            <p className="text-sm">
              By registering, you will receive a confirmation email with joining
              instructions and a reminder 30 minutes before the webinar starts.
            </p>
          </div>
        ) : (
          <div className="py-4 text-center text-red-500">
            Error loading webinar details.
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onRegister} 
            disabled={isLoading || !webinar}
          >
            Confirm Registration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebinarRegistrationForm;
