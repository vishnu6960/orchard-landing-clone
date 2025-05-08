
import { Card, Button } from 'react-bootstrap';

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
      <div className="text-center">
        <Card.Img 
          variant="top" 
          src={image} 
          style={{ height: '180px', objectFit: 'contain', padding: '10px' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-0 text-truncate">{title}</Card.Title>
        <Card.Text className="text-muted small mb-2">{category}</Card.Text>
        <Card.Text className="small text-muted mb-3 flex-grow-1">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">${price.toFixed(2)}</span>
          <Button variant="primary" size="sm">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
