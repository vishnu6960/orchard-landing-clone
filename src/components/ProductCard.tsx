
import { Card, Button, Badge } from 'react-bootstrap';

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, description, price, image, category }: ProductProps) => {
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ fontFamily: "'Poppins', Arial, sans-serif", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} 
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.05)";
          }}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image}
          className="border-bottom"
          style={{ 
            height: '200px', 
            objectFit: 'cover',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem'
          }}
        />
        <Badge
          bg={getCategoryBadgeColor(category)}
          className="position-absolute top-0 end-0 m-2 px-3 py-2"
          style={{ fontSize: '0.8rem', fontWeight: '600' }}
        >
          {category}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fw-bold mb-2" style={{ fontSize: '1.25rem', color: '#333' }}>
          {title}
        </Card.Title>
        <Card.Text className="mb-3 flex-grow-1 text-muted" style={{ fontSize: '0.95rem' }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fs-5 fw-bold" style={{ color: '#9b87f5' }}>${price.toFixed(2)}</span>
          <Button 
            variant="outline-primary" 
            className="fw-medium"
            style={{ 
              borderColor: '#9b87f5', 
              color: '#9b87f5', 
              transition: 'all 0.3s ease',
              borderRadius: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#9b87f5';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9b87f5';
            }}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Helper function to get badge color based on category
const getCategoryBadgeColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return 'primary';
    case 'audio':
      return 'info';
    case 'wearables':
      return 'success';
    case 'photography':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default ProductCard;
