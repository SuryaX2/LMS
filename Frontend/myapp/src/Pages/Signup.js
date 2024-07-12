import React, { useState } from 'react';
// import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    // const { setAuthState } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const clearFormFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
            });

            if (response.data.success) {
                // setAuthState(response.data.user);
                clearFormFields(); // Clear the form fields after successful signup
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='main'>
            <h1 className='heading'>BROADEN YOUR HORIZON</h1>

            <h2 className='text design'>Sign Up Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>

                <div>
                    <label className='text'>Username:</label>
                    <input
                        size="70"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className='text'>Email:</label>
                    <input
                        size="70"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label className='text'>Password:</label>
                    <input
                        size="70"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label className='text'>Confirm Password:</label>
                    <input
                        size="70"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;