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
  Alert,
  CircularProgress
} from '@mui/material';
import { LockReset, Email } from '@mui/icons-material';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/auth/verify-email', { email });
            if (response.data.success) {
                setEmailVerified(true);
                setMessage('');
            } else {
                setMessage('Email not found.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/auth/reset-password', { email, newPassword });
            setMessage(response.data.message);
            if (response.data.success)
                navigate("/login");
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Forgot Password
                    </Typography>
                    {!emailVerified ? (
                        <Box component="form" onSubmit={handleEmailSubmit} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                startIcon={<Email />}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Verify Email'}
                            </Button>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handlePasswordSubmit} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                startIcon={<LockReset />}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                            </Button>
                        </Box>
                    )}
                    {message && <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>}
                </Paper>
            </Box>
        </Container>
    );
};

export default Forgot;