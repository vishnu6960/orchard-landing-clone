
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
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Badge 
          bg="primary" 
          className="position-absolute top-0 end-0 m-2"
        >
          {category}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-0 text-truncate">{title}</Card.Title>
        <Card.Text className="mb-3 flex-grow-1 mt-2">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold text-primary">${price.toFixed(2)}</span>
          <Button variant="outline-primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
