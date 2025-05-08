
import { Container, Row, Col } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '76px' }}>
        <Container className="py-5">
          <h1 className="text-center mb-5">About Us</h1>
          
          <Row className="mb-5">
            <Col md={6}>
              <h3>Our Story</h3>
              <p>
                Founded in 2010, My Shop has been providing customers with high-quality products for over a decade. 
                What started as a small store in our founder's garage has grown into a beloved online marketplace.
              </p>
              <p>
                Our mission is to offer the best products at affordable prices while providing exceptional customer service. 
                We carefully select each item in our inventory to ensure it meets our high standards of quality and value.
              </p>
            </Col>
            <Col md={6}>
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Our Story" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col md={6} className="order-md-2">
              <h3>Our Vision</h3>
              <p>
                We believe in creating a shopping experience that is easy, enjoyable, and transparent. 
                Our team works tirelessly to improve our offerings and ensure customer satisfaction.
              </p>
              <p>
                As we continue to grow, we remain committed to our core values of honesty, quality, and exceptional service. 
                We're dedicated to building lasting relationships with our customers and providing them with products they'll love.
              </p>
            </Col>
            <Col md={6} className="order-md-1">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Our Vision" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
          
          <Row>
            <Col className="text-center">
              <h3>Our Team</h3>
              <p className="mb-5">
                Our dedicated team of professionals is passionate about providing you with the best shopping experience.
              </p>
              <Row xs={1} sm={2} md={4} className="g-4">
                {[1, 2, 3, 4].map((member) => (
                  <Col key={member}>
                    <img 
                      src={`https://via.placeholder.com/150`} 
                      alt={`Team Member ${member}`} 
                      className="rounded-circle mb-3"
                    />
                    <h5>Team Member {member}</h5>
                    <p className="text-muted">Position</p>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
