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
    Grid,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersonAdd, Email, Lock, CheckCircle, LockOpen } from '@mui/icons-material';

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
            <Container component="main" maxWidth="lg" sx={{ height: '100vh' }}>
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={false} sm={4} md={7} sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/1600x900?nature)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <LockOpen sx={{ m: 1, fontSize: 48, color: 'primary.main' }} />
                            <Typography component="h1" variant="h5" gutterBottom>
                                Sign Up
                            </Typography>
                            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1, width: '100%' }}>
                                <FormControl component="fieldset" sx={{ mb: 2 }}>
                                    <FormLabel component="legend">User Role</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="role"
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <FormControlLabel value="user" control={<Radio />} label="User" />
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                    </RadioGroup>
                                </FormControl>
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
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mt={5}>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {'Copyright © '}
                                    <Link color="inherit" href="https://your-website.com/">
                                        Your Website
                                    </Link>{' '}
                                    {new Date().getFullYear()}
                                    {'.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;