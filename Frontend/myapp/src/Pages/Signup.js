import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Checkbox,
    FormControlLabel,
    Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersonAdd, Email, Lock, CheckCircle, LockOutlined } from '@mui/icons-material';

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
            <Container component="main" maxWidth="lg" sx={{
                height: '100vh',
                display: 'flex',
                backgroundColor: 'background.default',
            }}>
                <Paper elevation={6} sx={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '80vh',
                    overflow: 'hidden',
                }}>
                    <Box
                        sx={{
                            flex: 2,
                            backgroundImage: 'url(https://source.unsplash.com/random/1600x900?nature)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                        }}
                    >
                        <LockOutlined sx={{ color: 'primary.main', fontSize: 40, mb: 2 }} />
                        <Typography component="h1" variant="h5" gutterBottom>
                            Sign Up
                        </Typography>
                        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                        <Box component="form" onSubmit={handleSignup} sx={{ mt: 1, width: '100%' }}>
                            {/* Keep the existing radio buttons for user/admin role */}
                            <div className="mb-4 text-center">
                                <div className="btn-group" role="group" aria-label="User role">
                                    {/* ... (keep existing radio buttons) */}
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                            {"Copyright © "}
                            <Link color="inherit" href="https://your-website.com/">
                                Your Website
                            </Link>{" "}
                            {new Date().getFullYear()}
                            {"."}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;