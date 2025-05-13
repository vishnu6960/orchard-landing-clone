
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="content-container">
        <div className="error-content">
          <h1 className="error-title">404</h1>
          <h2 className="error-subtitle">Page Not Found</h2>
          <p className="error-message">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="home-link">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
