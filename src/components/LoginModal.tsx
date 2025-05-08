
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onRegisterClick: () => void;
}

const LoginModal = ({ show, onHide, onRegisterClick }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login - replace with actual authentication in a real app
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only - would normally check credentials with backend
      if (email === 'demo@example.com' && password === 'password') {
        console.log('Login successful');
        onHide();
        // Normally would set authentication state here
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    onHide();
    onRegisterClick();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={switchToRegister}>Register</a>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
