import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const Navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
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
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/auth/reset-password', { email, newPassword });
            setMessage(response.data.message);
            if (response.data.success)
                Navigate("./login");
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                {!emailVerified ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Verify Email
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="w-full px-3 py-2 border rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-3 py-2 border rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Forgot;
