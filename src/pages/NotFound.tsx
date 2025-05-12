
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '76px' }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-4">Oops! Page Not Found</h2>
              <p className="lead mb-4">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </p>
              <Link to="/">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="px-4 py-2"
                >
                  Back to Homepage
                </Button>
              </Link>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop"
                alt="404 Page Not Found" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
