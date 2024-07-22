import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

const UserDashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchBooks();
    }
  }, [isAuthenticated, navigate]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  async function fetchBooks() {
    try {
      const res = await axios.get('http://localhost:3001/api/books/get-books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  }

  async function handleBorrow(bookId) {
    try {
      const res = await axios.post('http://localhost:3001/api/books-borrow', { bookId });
      setUserBooks([...userBooks, res.data]);
    } catch (err) {
      setError('Failed to borrow book');
    }
  }

  async function handleReturn(bookId) {
    try {
      await axios.post('http://localhost:3001/api/books-return', { bookId });
      setUserBooks(userBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError('Failed to return book');
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const goToDashboard = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="dashboard">
      <div className="navbar">
      <div className="navbar-profile" onClick={toggleDropdown}>
        <img src="/path-to-profile-icon.png" alt="Profile Icon" className="profile-icon" />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={goToDashboard}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
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
