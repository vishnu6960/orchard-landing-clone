
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type EventCardProps = {
  id: string;
  title: string;
  description?: string;
  location: string;
  start_time: string;
  end_time: string;
  onRegister: (eventId: string) => void;
};

const EventCard = ({ 
  id,
  title, 
  description, 
  location, 
  start_time, 
  end_time,
  onRegister 
}: EventCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <div className="text-sm text-gray-600 mb-4">
          <p>Start: {new Date(start_time).toLocaleString()}</p>
          <p>End: {new Date(end_time).toLocaleString()}</p>
        </div>
        <Button 
          onClick={() => onRegister(id)}
          className="w-full"
        >
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
