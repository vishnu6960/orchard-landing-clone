
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="image-container">
        <div className="creative-overlay">
          <div className="glitch-container">
            <div className="glitch" data-text="404">404</div>
          </div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-message">The page you're looking for has drifted into the digital void.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
