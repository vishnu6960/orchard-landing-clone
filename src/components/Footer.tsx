
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>My Shop</h5>
            <p>Your one-stop shop for all your needs.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/products" className="text-white">Products</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <address>
              <p>123 Shop Street<br />Shopping City, SC 12345</p>
              <p>Email: info@myshop.com<br />Phone: (123) 456-7890</p>
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center pt-3 border-top">
            <p>&copy; {currentYear} My Shop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
