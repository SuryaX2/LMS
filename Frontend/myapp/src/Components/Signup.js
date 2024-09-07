import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { PersonAdd, Email, Lock, CheckCircle, LockOpen } from '@mui/icons-material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    const navigate = useNavigate();

    const clearFormFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('user');
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/auth/signup`, {
                username,
                email,
                password,
                role
            });

            if (response.data.success) {
                clearFormFields();
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container fluid className="vh-100 p-0">
            <Row className="h-100 m-0">
                <Col xs={12} md={7} className="d-none d-md-block p-0">
                    <div
                        className="h-100 w-100"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                </Col>
                <Col xs={12} md={5} className="d-flex align-items-center justify-content-center">
                    <div className="w-100 p-4">
                        <div className="text-center mb-4">
                            <LockOpen style={{ fontSize: 48, color: '#1976d2' }} />
                            <h2>Sign Up</h2>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSignup}>
                            <Form.Group className="mb-3">
                                <Form.Label>User Role</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="User"
                                        name="role"
                                        value="user"
                                        checked={role === 'user'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Admin"
                                        name="role"
                                        value="admin"
                                        checked={role === 'admin'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><PersonAdd /></span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><Email /></span>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><Lock /></span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><CheckCircle /></span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Sign Up
                            </Button>
                            <div className="text-end mt-3">
                                <span>Already have an account? </span>
                                <Link to="/login" className="text-decoration-none">Log in</Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;