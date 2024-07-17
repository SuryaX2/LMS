// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/books')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-6xl p-6 bg-white rounded shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="relative">
                        <button className="focus:outline-none" onClick={handleDropdownToggle}>
                            <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                <button onClick={() => handleNavigation('/admin-dashboard')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Dashboard</button>
                                <button onClick={() => handleNavigation('/logout')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={() => handleNavigation('/add-book')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Book</button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Books</h2>
                    <ul className="mt-2">
                        {books.map(book => (
                            <li key={book._id} className="mb-2">
                                <div className="p-4 bg-gray-200 rounded">
                                    <h3 className="font-bold">{book.title}</h3>
                                    <p>Author: {book.author}</p>
                                    <p>ISBN: {book.isbn}</p>
                                    <p>Price: ${book.price}</p>
                                    <p>Quantity: {book.quantity}</p>
                                    {book.borrowedBy ? (
                                        <p>Borrowed By: {book.borrowedBy.name} ({book.borrowedBy.email})</p>
                                    ) : (
                                        <p>Available</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
