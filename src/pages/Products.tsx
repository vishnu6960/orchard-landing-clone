
import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Sample product data
const allProducts = [
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
  },
  {
    id: 7,
    title: "Desktop Computer",
    description: "Powerful desktop computer for gaming and professional work",
    price: 1499.99,
    image: "https://via.placeholder.com/300",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    description: "Compact wireless earbuds with amazing sound quality",
    price: 129.99,
    image: "https://via.placeholder.com/300",
    category: "Audio"
  },
  {
    id: 9,
    title: "Smart Speaker",
    description: "Voice controlled smart speaker for your home",
    price: 99.99,
    image: "https://via.placeholder.com/300",
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
