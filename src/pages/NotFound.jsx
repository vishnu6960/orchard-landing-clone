
import { Container } from 'react-bootstrap';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="image-container">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
          alt="404 Page Not Found" 
          className="not-found-img"
        />
        <div className="overlay">
          <div className="overlay-content">
            <h2 className="error-code">404</h2>
            <h1 className="display-4 fw-bold mb-3 text-white">Oops! Page Not Found</h1>
            <p className="lead mb-4 text-white">We couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
