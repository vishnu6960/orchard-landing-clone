
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Container className="py-5 d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
        <div className="not-found-content">
          <img 
            src="https://www.imarkinfotech.com/wp-content/uploads/2017/10/404-Page-Cover.png" 
            alt="404 Page Not Found" 
            className="img-fluid mb-4 not-found-img"
          />
          <h1 className="display-4 fw-bold mb-3">Oops! 404 - Page Not Found</h1>
          <p className="lead mb-4">The Page you are looking for doesn't exist</p>
          <Link to="/">
            <Button variant="primary" size="lg" className="px-4 py-2">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
