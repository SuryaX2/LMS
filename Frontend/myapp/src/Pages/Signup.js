import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersonAdd, Email, Lock, CheckCircle } from '@mui/icons-material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="card-title text-center text-primary mb-4">Broaden Your Horizon</h2>
              <h3 className="text-center mb-4">Sign Up</h3>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSignup}>
                <div className="mb-4 text-center">
                  <div className="btn-group" role="group" aria-label="User role">
                    <input
                      type="radio"
                      className="btn-check"
                      name="role"
                      id="user"
                      value="user"
                      checked={role === 'user'}
                      onChange={(e) => setRole(e.target.value)}
                      autoComplete="off"
                    />
                    <label className="btn btn-outline-primary" htmlFor="user">User</label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="role"
                      id="admin"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={(e) => setRole(e.target.value)}
                      autoComplete="off"
                    />
                    <label className="btn btn-outline-primary" htmlFor="admin">Admin</label>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="username">
                    <PersonAdd className="me-2" />
                    Username
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">
                    <Email className="me-2" />
                    Email address
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">
                    <Lock className="me-2" />
                    Password
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirmPassword">
                    <CheckCircle className="me-2" />
                    Confirm Password
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;