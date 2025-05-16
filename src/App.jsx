
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import WebinarCard from "./components/WebinarCard";

const App = () => {
  // Sample webinar data
  const webinars = [
    {
      id: 1,
      title: "Advanced React Patterns Workshop",
      description: "Learn the most advanced React patterns and techniques used by top developers. This workshop will cover hooks, context API, and performance optimization.",
      date: "May 24 2025",
      time: "1:00 PM EST",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      speaker: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Web Performance Masterclass",
      description: "Discover strategies to optimize your web applications for maximum performance. We'll cover loading strategies, code splitting, and more.",
      date: "Jun 12 2025",
      time: "2:30 PM EST",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      speaker: "Michael Chen"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Master the core principles of effective user interface and experience design. This webinar covers best practices and modern design tools.",
      date: "Jul 03 2025",
      time: "11:00 AM EST",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop",
      speaker: "Emma Rodriguez"
    }
  ];

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100" style={{
        background: "linear-gradient(135deg, #1A1F2C 0%, #2d3748 100%)",
        color: "#ffffff"
      }}>
        <main className="flex-grow-1">
          <div className="container py-5">
            <h1 className="text-center mb-4" style={{ color: "#9b87f5" }}>Upcoming Webinars</h1>
            <p className="text-center mb-5" style={{ color: "#e2e8f0" }}>Join our expert-led sessions to enhance your skills and stay ahead in your field</p>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {webinars.map((webinar) => (
                <div className="col" key={webinar.id}>
                  <WebinarCard {...webinar} />
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
