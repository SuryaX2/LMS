import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Email, Lock, Login as LoginIcon } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      if (response.data.success) {
        login();
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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">
            <LoginIcon className="me-2" />
            Login
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <Email className="me-2" />
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <Lock className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              <LoginIcon className="me-2" />
              Login
            </Button>

            <div className="d-flex justify-content-between align-items-center">
              <span>
                Not a Member? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
              </span>
              <Link to="/forgot" className="text-decoration-none">Forgot password?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;