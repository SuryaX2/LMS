import React, { useState } from 'react';
import './Signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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
<div className="flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover font-sans p-2">
    <div className="bg-transparent bg-opacity-40 shadow-lg backdrop-blur-sm p-4 rounded-lg w-full max-w-md mx-4 h-auto max-h-screen overflow-y-auto">
        <h1 className="text-center text-white text-3xl mt-1 mb-2">BROADEN YOUR HORIZON</h1>
        <h2 className="text-white text-lg mt-2 mb-1 pt-1 border-t border-white">Sign Up Page</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col">
            <div className="mb-0">
                <label className="text-white block mb-1">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-0">
                <label className="text-white block mb-1">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-0">
                <label className="text-white block mb-1">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-0">
                <label className="text-white block mb-1">Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-3"
            >
                Sign Up
            </button>
        </form>
    </div>
</div>

    );
};

export default Signup;
