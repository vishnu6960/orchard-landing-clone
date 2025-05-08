
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

// Sample product data with improved images
const sampleProducts = [
  {
    id: 1,
    title: "MacBook Pro M2",
    description: "Ultra-fast laptop with the latest M2 chip and stunning Retina display",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: 2,
    title: "iPhone 15 Pro",
    description: "The most advanced iPhone yet with revolutionary camera system",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Noise-Cancelling Headphones",
    description: "Premium wireless headphones with industry-leading noise cancellation",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    category: "Audio"
  },
  {
    id: 4,
    title: "Smart Fitness Watch",
    description: "Track your health and stay connected with this advanced wearable",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=400&fit=crop",
    category: "Wearables"
  },
  {
    id: 5,
    title: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with this professional grade camera",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop",
    category: "Photography"
  },
  {
    id: 6,
    title: "iPad Air",
    description: "Ultra-thin tablet perfect for work, creativity, and entertainment on the go",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop",
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
        {/* Carousel with high-quality images */}
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
              alt="Tech showcase"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="text-center bg-dark bg-opacity-50 rounded p-3">
              <h3>Welcome to Tech Haven</h3>
              <p>Discover amazing products at competitive prices</p>
              <Button variant="primary" className="mb-3">Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
              alt="Remote work setup"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="text-center bg-dark bg-opacity-50 rounded p-3">
              <h3>Productivity Essentials</h3>
              <p>Gear up for remote work and learning</p>
              <Button variant="primary" className="mb-3">View Collection</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80"
              alt="Premium tech"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="text-center bg-dark bg-opacity-50 rounded p-3">
              <h3>Premium Tech Deals</h3>
              <p>Special offers on our premium collection</p>
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
          <div className="text-center mt-4">
            <Button variant="outline-primary" href="/products">View All Products</Button>
          </div>
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
