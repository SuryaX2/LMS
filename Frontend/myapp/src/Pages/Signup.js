import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersonAdd, Email, Lock, CheckCircle } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Paper elevation={6} sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Typography gutterBottom color="primary" fontWeight="bold" component="h1" variant="h4">
                        Broaden Your Horizon
                    </Typography>
                    <Typography component="h1" variant="h4" gutterBottom color="primary" fontWeight="bold">
                        Sign Up
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleSignup} sx={{ mt: 1, width: '100%' }}>
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
                                <label className="btn btn-outline-primary" htmlFor="user">Users</label>

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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: <PersonAdd sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                startAdornment: <CheckCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 ,padding:1.5}}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;