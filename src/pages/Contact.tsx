
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [validated, setValidated] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // In a real app, you would submit the form data to a server
      alert("Thank you for your message! We'll get back to you soon.");
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
    
    setValidated(true);
  };
  
  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '76px' }}>
        <Container className="py-5">
          <h1 className="text-center mb-5">Contact Us</h1>
          
          <Row>
            <Col lg={5} className="mb-4">
              <h3>Get In Touch</h3>
              <p>Have questions about our products or services? We're here to help!</p>
              
              <div className="mt-4">
                <h5>Address</h5>
                <p>123 Shop Street, Shopping City, SC 12345</p>
              </div>
              
              <div className="mt-4">
                <h5>Phone</h5>
                <p>(123) 456-7890</p>
              </div>
              
              <div className="mt-4">
                <h5>Email</h5>
                <p>info@myshop.com</p>
              </div>
              
              <div className="mt-4">
                <h5>Working Hours</h5>
                <p>Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 10:00 AM - 3:00 PM<br />
                Sunday: Closed</p>
              </div>
            </Col>
            
            <Col lg={7}>
              <h3>Send Us a Message</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formName">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formEmail">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter message subject"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Enter your message"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="mb-3">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
          
          {/* Google Map (placeholder) */}
          <Row className="mt-5">
            <Col>
              <h3 className="text-center mb-4">Our Location</h3>
              <div className="bg-light" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="text-muted">Map placeholder - in a real app, you would embed a Google Map here</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
