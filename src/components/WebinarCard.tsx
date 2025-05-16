
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface WebinarProps {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  category: string;
  imageUrl: string;
  showDetails?: boolean;
  showRegister?: boolean;
  disableDetails?: boolean;
  disableRegister?: boolean;
  registerLabel?: string;
  onRegister?: (id: string) => void;
}

const WebinarCard = ({
  _id,
  title,
  description,
  date,
  time,
  category,
  imageUrl,
  showDetails = true,
  showRegister = true,
  disableDetails = false,
  disableRegister = false,
  registerLabel = "Register",
  onRegister
}: WebinarProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0" style={{ minHeight: '440px', fontFamily: "'Poppins', Arial, sans-serif" }}>
        <img
          src={imageUrl}
          alt={title}
          className="card-img-top"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem'
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold text-primary mb-2" style={{ fontFamily: "'Poppins', Arial, sans-serif" }}>
            <i className="fa-solid fa-graduation-cap me-2 text-info"></i>
            {title}
          </h5>
          <span className="badge bg-info text-dark mb-2">
            <i className="fa-solid fa-tag me-1"></i>
            {category}
          </span>
          <p className="card-text text-muted mb-3" style={{ fontSize: '1rem' }}>
            <i className="fa-solid fa-align-left me-2 text-secondary"></i>
            {description?.substring(0, 180)}...
          </p>
          <div className="text-secondary mb-3" style={{ fontSize: "0.97rem" }}>
            <i className="fa-solid fa-calendar-days me-2"></i>
            {new Date(date).toLocaleDateString()} &bull;
            <i className="fa-regular fa-clock ms-2 me-1"></i>
            {time}
          </div>
          <div className="mt-auto d-flex gap-2">
            {showDetails && (
              <button
                className="btn btn-outline-primary btn-sm flex-fill"
                disabled={disableDetails}
                style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
              >
                <i className="fa-solid fa-circle-info me-1"></i>
                Details
              </button>
            )}
            {showRegister && (
              <button
                className={`btn btn-sm flex-fill ${disableRegister ? 'btn-secondary' : 'btn-success'}`}
                onClick={() => !disableRegister && onRegister && onRegister(_id)}
                disabled={disableRegister}
                style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
              >
                <i className="fa-solid fa-right-to-bracket me-1"></i>
                {registerLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarCard;
