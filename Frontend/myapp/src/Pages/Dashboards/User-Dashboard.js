import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const UserDashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState('');
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home"><MenuBookIcon className="me-2 mb-2" />User Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  <PersonIcon className="me-2" />User
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation('/admin-dashboard')}><MenuBookIcon className="me-2" />Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}><LogoutIcon className="me-2" />Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
