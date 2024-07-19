import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Email, Lock, Login as LoginIcon, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    login();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      if (response.data.success) {
        const role = response.data.role;
        localStorage.setItem('role', role);
        if (role === 'user') {
          navigate('/user-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <LoginIcon style={{ fontSize: 50, color: '#007bff' }} />
            <h2 className="mt-3 font-weight-bold">Login</h2>
          </div>
          {error && <Alert variant="danger" className="text-center mb-4">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className="d-block mb-2">Email address</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Email color="action" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="d-block mb-2">Password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Lock color="action" />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
                <Button 
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-2 mb-4">
              Login
            </Button>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Not a Member? <a href='/signup' className='text-primary text-decoration-none'>Sign Up</a>
              </small>
              <small>
                <a href="/forgot" className="text-primary text-decoration-none">Forgot password?</a>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;