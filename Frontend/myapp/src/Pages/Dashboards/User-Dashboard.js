import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import { Container, Navbar, Nav, Dropdown, Table, Button } from 'react-bootstrap';
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
      setBooks(res.data.filter(book => book.quantity > 0));
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  }

  async function fetchUserBooks() {
    try {
      const res = await axios.get('http://localhost:3001/api/books/get-user-books');
      setUserBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch user books', err);
    }
  }

  async function handleBorrow(bookId) {
    try {
      const res = await axios.post('http://localhost:3001/api/books-borrow', { bookId });
      setUserBooks([...userBooks, res.data]);
      setBooks(books.map(book => 
        book._id === bookId ? { ...book, quantity: book.quantity - 1 } : book
      ).filter(book => book.quantity > 0));
    } catch (err) {
      setError('Failed to borrow book');
    }
  }

  async function handleReturn(bookId) {
    try {
      const res = await axios.post('http://localhost:3001/api/books-return', { bookId });
      if (res.data.success) {
        setUserBooks(userBooks.filter((book) => book._id !== bookId));
        setBooks(prevBooks => {
          const updatedBooks = [...prevBooks];
          const bookIndex = updatedBooks.findIndex(book => book._id === bookId);
          if (bookIndex !== -1) {
            updatedBooks[bookIndex].quantity += 1;
          } else {
            // Fetch the book details again to add it back to the available books
            axios.get(`http://localhost:3001/api/books/get-book/${bookId}`).then(response => {
              updatedBooks.push(response.data);
              setBooks(updatedBooks);
            });
          }
          return updatedBooks;
        });
      }
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
      <Container>
        <h2>Your Borrowed Books</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>${book.price}</td>
                <td>
                  <Button variant="warning" onClick={() => handleReturn(book._id)}>Return</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2>Available Books</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>${book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  <Button variant="primary" onClick={() => handleBorrow(book._id)}>Borrow</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserDashboard;
