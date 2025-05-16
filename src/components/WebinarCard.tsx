
import React from 'react';
import { Calendar } from 'lucide-react';

interface WebinarCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  speaker: string;
}

const WebinarCard = ({
  title = "Advanced React Patterns Workshop",
  description = "Learn the most advanced React patterns and techniques used by top developers. This workshop will cover hooks, context API, and performance optimization.",
  date = "May 24, 2025",
  time = "1:00 PM EST",
  image = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
  speaker = "Sarah Johnson"
}: Partial<WebinarCardProps>) => {
  return (
    <div className="card shadow border-0 h-100 position-relative overflow-hidden" 
      style={{ 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: '#e2e8f0'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
      }}>
      
      {/* Card Image with Date Overlay */}
      <div className="position-relative">
        <img 
          src={image} 
          className="card-img-top" 
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        {/* Date Badge */}
        <div 
          className="position-absolute d-flex flex-column align-items-center justify-content-center text-white rounded p-2"
          style={{ 
            top: '15px', 
            right: '15px', 
            width: '70px', 
            height: '70px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          <Calendar size={20} className="mb-1" />
          <div className="text-center">
            <span className="fw-bold">{date.split(' ')[1]}</span>
            <div className="small">{date.split(' ')[0]}</div>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-2" style={{ color: '#9b87f5' }}>{title}</h5>
        <p className="card-text mb-3 flex-grow-1" style={{ color: '#9CA3AF' }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        {/* Time and Speaker */}
        <div className="d-flex justify-content-between align-items-center small mb-3" style={{ color: '#9CA3AF' }}>
          <span>
            <i className="bi bi-clock me-2"></i>
            {time}
          </span>
          <span>
            <i className="bi bi-person me-2"></i>
            {speaker}
          </span>
        </div>
        
        {/* Register Button */}
        <button 
          className="btn w-100" 
          style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
            color: 'white',
            borderRadius: '6px',
            fontWeight: '500',
            padding: '10px',
            transition: 'all 0.3s ease',
            border: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default WebinarCard;
