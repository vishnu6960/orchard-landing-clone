
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play } from "lucide-react";

type Webinar = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

const sampleWebinars: Webinar[] = [
  {
    id: 1,
    title: "Introduction to React Development",
    description: "Learn the fundamentals of React, including components, props, and state management.",
    instructor: "Sarah Johnson",
    duration: "1.5 hours",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Advanced State Management",
    description: "Deep dive into modern state management techniques with Redux and Context API.",
    instructor: "Michael Chen",
    duration: "2 hours",
    level: "Advanced"
  },
  {
    id: 3,
    title: "Building Responsive UIs",
    description: "Master the art of creating responsive and accessible user interfaces.",
    instructor: "Emma Wilson",
    duration: "1 hour",
    level: "Intermediate"
  }
];

const Webinars = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredWebinars = selectedLevel === "all" 
    ? sampleWebinars 
    : sampleWebinars.filter(webinar => webinar.level.toLowerCase() === selectedLevel.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 px-4 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Webinars</h1>
            <p className="text-gray-600">Enhance your skills with our expert-led webinars</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
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
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar) => (
            <Card key={webinar.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{webinar.title}</CardTitle>
                    <CardDescription className="text-sm">
                      by {webinar.instructor} • {webinar.duration}
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
              <CardContent>
                <p className="text-gray-600 mb-4">{webinar.description}</p>
                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Webinar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No webinars found for the selected level.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Webinars;
