import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

const UserDashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books', {
          headers: {
            Authorization: `Bearer ${isAuthenticated.token}`,
          },
        });
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      }
    };

    const fetchUserBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/books', {
          headers: {
            Authorization: `Bearer ${isAuthenticated.token}`,
          },
        });
        setUserBooks(response.data);
      } catch (err) {
        setError('Failed to fetch user books');
      }
    };

    fetchBooks();
    fetchUserBooks();
  }, [isAuthenticated, navigate]);

  const handleBorrow = async (bookId) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/books/borrow',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated.token}`,
          },
        }
      );
      setUserBooks([...userBooks, response.data]);
    } catch (err) {
      setError('Failed to borrow book');
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await axios.post(
        'http://localhost:3001/api/books/return',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated.token}`,
          },
        }
      );
      setUserBooks(userBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError('Failed to return book');
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Your Borrowed Books</h2>
      <ul>
        {userBooks.map((book) => (
          <li key={book.id}>
            {book.title} <button onClick={() => handleReturn(book.id)}>Return</button>
          </li>
        ))}
      </ul>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} <button onClick={() => handleBorrow(book.id)}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
