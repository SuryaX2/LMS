import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Email, Lock, LockOpen } from '@mui/icons-material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
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
            const response = await axios.post('http://localhost:3001/api/auth/signup', {
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
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-md-8 d-none d-md-block" style={{
                    backgroundImage: 'url("https://source.unsplash.com/random/1600x900?nature")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="col-md-4 d-flex align-items-center bg-light">
                    <div className="w-100 p-4">
                        <div className="text-center mb-4">
                            <LockOpen style={{ fontSize: 48, color: '#7b1fa2' }} />
                            <h2 className="mt-2">Sign in</h2>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address *</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <Email color="action" />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control border-start-0"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password *</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <Lock color="action" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control border-start-0"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-3">
                                SIGN IN
                            </button>
                            <div className="d-flex justify-content-between">
                                <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                                <Link to="/signup" className="text-decoration-none">Don't have an account? Sign Up</Link>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <small className="text-muted">&copy; Your Website {new Date().getFullYear()}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;