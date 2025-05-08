
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    title: "Laptop",
    description: "High performance laptop with the latest processor and ample storage",
    price: 999.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Smartphone",
    description: "Latest smartphone with amazing camera and long battery life",
    price: 699.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Headphones",
    description: "Noise cancelling headphones with superior sound quality",
    price: 149.99,
    image: "https://via.placeholder.com/300",
    category: "Audio"
  },
  {
    id: 4,
    title: "Smartwatch",
    description: "Track your fitness and stay connected with this smartwatch",
    price: 249.99,
    image: "https://via.placeholder.com/300",
    category: "Wearables"
  },
  {
    id: 5,
    title: "Camera",
    description: "Professional grade camera for stunning photography",
    price: 1299.99,
    image: "https://via.placeholder.com/300",
    category: "Photography"
  },
  {
    id: 6,
    title: "Tablet",
    description: "Portable tablet for work and entertainment on the go",
    price: 399.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics"
  }
];

const Home = () => {
  const [products] = useState(sampleProducts);

  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '56px' }}>
        {/* Carousel */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400"
              alt="First slide"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>Welcome to My Shop</h3>
              <p>Discover amazing products at great prices</p>
              <Button variant="primary" className="mb-3">Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400"
              alt="Second slide"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>New Arrivals</h3>
              <p>Check out our latest products</p>
              <Button variant="primary" className="mb-3">View New Arrivals</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1200x400"
              alt="Third slide"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>Special Offers</h3>
              <p>Limited time deals you don't want to miss</p>
              <Button variant="primary" className="mb-3">See Offers</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Featured Products */}
        <Container className="py-5">
          <h2 className="text-center mb-4">Featured Products</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <ProductCard {...product} />
              </Col>
            ))}
          </Row>
        </Container>

        {/* Call to Action */}
        <div className="bg-light py-5">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <h2>Join Our Newsletter</h2>
                <p className="lead">Get updates on new products and special offers</p>
                <div className="input-group mb-3 w-75 mx-auto">
                  <input type="email" className="form-control" placeholder="Your email address" />
                  <Button variant="primary">Subscribe</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
