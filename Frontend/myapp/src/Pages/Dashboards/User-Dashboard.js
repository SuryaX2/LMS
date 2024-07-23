import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import {
  Container, Navbar, Nav, Dropdown, Table, Button, Card, Alert
} from 'react-bootstrap';
import {
  Menu as MenuIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Book as BookIcon,
  KeyboardReturn as ReturnIcon
} from '@mui/icons-material';

const UserDashboard = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchBooks();
      fetchUserBooks();
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
      setError('Failed to fetch books: ' + err.message);
    }
  }

  async function fetchUserBooks() {
    if (user && user._id) {
      try {
        const res = await axios.get(`http://localhost:3001/api/books/user-books/${user._id}`);
        setUserBooks(res.data);
      } catch (err) {
        setError('Failed to fetch user books: ' + err.message);
      }
    }
  }

  async function handleBorrow(bookId) {
    if (user && user._id) {
      try {
        const res = await axios.post('http://localhost:3001/api/books/borrow', { bookId, userId: user._id });
        setBooks(books.map(book => book._id === bookId ? { ...book, quantity: book.quantity - 1 } : book));
        setUserBooks([...userBooks, res.data]);
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Failed to borrow book: ' + err.response?.data?.message || err.message);
      }
    } else {
      setError('User not authenticated');
    }
  }

  async function handleReturn(bookId) {
    if (user && user._id) {
      try {
        const res = await axios.post('http://localhost:3001/api/books/return', { bookId, userId: user._id });
        setBooks(books.map(book => book._id === bookId ? { ...book, quantity: book.quantity + 1 } : book));
        setUserBooks(userBooks.filter(book => book._id !== bookId));
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Failed to return book: ' + err.response?.data?.message || err.message);
      }
    } else {
      setError('User not authenticated');
    }
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <MenuBookIcon className="me-2" />
            User Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="d-flex align-items-center">
                  <PersonIcon className="me-2" />
                  {user ? user.username || 'User' : 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation('/admin-dashboard')}>
                    <MenuIcon className="me-2" />
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <LogoutIcon className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5" className="bg-primary text-white">
            <BookIcon className="me-2" />
            Your Borrowed Books
          </Card.Header>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleReturn(book._id)}
                        className="d-flex align-items-center"
                      >
                        <ReturnIcon className="me-1" />
                        Return
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <Card.Header as="h5" className="bg-success text-white">
            <MenuBookIcon className="me-2" />
            Available Books
          </Card.Header>
          <Card.Body>
            <Table responsive striped hover className="align-middle">
              <thead>
                <tr className='text-center'>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {books.filter(book => book.quantity > 0).map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleBorrow(book._id)}
                        className="d-flex align-items-center"
                      >
                        <BookIcon className="me-1" />
                        Borrow
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserDashboard;