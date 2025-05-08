
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
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2>Our Story</h2>
              <p>
                Founded in 2023, My Shop began with a simple mission: to provide high-quality tech products at competitive prices
                with exceptional customer service. What started as a small online store has grown into a trusted retailer
                of premium electronics and tech accessories.
              </p>
              <p>
                Our team of tech enthusiasts is passionate about curating the best products on the market and helping
                our customers find the perfect solutions for their needs. We believe in the power of technology to enhance
                lives and are committed to making the latest innovations accessible to everyone.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop" 
                alt="Team working together" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
              <h2>Our Values</h2>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <h5>Quality First</h5>
                  <p>We never compromise on the quality of our products. Every item in our inventory has been carefully selected and tested.</p>
                </li>
                <li className="mb-3">
                  <h5>Customer Satisfaction</h5>
                  <p>Your satisfaction is our priority. We're not happy until you're happy with your purchase.</p>
                </li>
                <li className="mb-3">
                  <h5>Innovation</h5>
                  <p>We stay at the forefront of technological advancements to bring you the latest and greatest products.</p>
                </li>
                <li>
                  <h5>Integrity</h5>
                  <p>We operate with honesty and transparency in all our business practices.</p>
                </li>
              </ul>
            </Col>
            <Col lg={6} className="order-lg-1">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=500&fit=crop" 
                alt="Modern office space" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
          
          <Row>
            <Col className="text-center">
              <h2 className="mb-4">Our Team</h2>
              <p className="lead mb-5">
                Our dedicated team of professionals works tirelessly to ensure you have the best shopping experience.
              </p>
            </Col>
          </Row>
          
          <Row xs={1} md={2} lg={4} className="g-4">
            {[
              {
                name: "Jane Doe",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
              },
              {
                name: "John Smith",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop"
              },
              {
                name: "Emily Chen",
                role: "Product Manager",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
              },
              {
                name: "Michael Brown",
                role: "Customer Support Lead",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
              }
            ].map((member, index) => (
              <Col key={index}>
                <div className="text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="img-fluid rounded-circle mb-3 shadow"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h4>{member.name}</h4>
                  <p className="text-muted">{member.role}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
