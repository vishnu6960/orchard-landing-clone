
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '76px' }}>
        <Container className="py-5 text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Go to Homepage
          </Button>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
