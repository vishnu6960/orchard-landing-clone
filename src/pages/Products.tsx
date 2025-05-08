
import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Sample product data with better images
const allProducts = [
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
    description: "Latest smartphone with breakthrough camera system and all-day battery life",
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
    description: "Track your health metrics and stay connected with this advanced wearable",
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
  },
  {
    id: 7,
    title: "Gaming Desktop PC",
    description: "High-performance desktop computer for gaming and professional work",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    description: "Compact wireless earbuds with exceptional sound quality and comfort",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1590658602232-4bda0d0eeb89?w=600&h=400&fit=crop",
    category: "Audio"
  },
  {
    id: 9,
    title: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound for your home",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop",
    category: "Audio"
  }
];

const categories = ["All", "Electronics", "Audio", "Wearables", "Photography"];
const sortOptions = ["Price: Low to High", "Price: High to Low", "Name: A to Z", "Name: Z to A"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  
  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Name: A to Z":
        return a.title.localeCompare(b.title);
      case "Name: Z to A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div>
      <MyNavbar />
      
      {/* Main content with top margin to account for the fixed navbar */}
      <div style={{ paddingTop: '76px' }}>
        <Container className="py-5">
          <h1 className="text-center mb-4">Our Products</h1>
          
          {/* Filter and Sort Controls */}
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary">
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  Sort: {sortBy}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sortOptions.map(option => (
                    <Dropdown.Item 
                      key={option} 
                      onClick={() => setSortBy(option)}
                      active={sortBy === option}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          
          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {sortedProducts.map(product => (
                <Col key={product.id}>
                  <ProductCard {...product} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <Button 
                variant="primary" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
