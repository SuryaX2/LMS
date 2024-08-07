import React, { useState, useEffect, useNavigate } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, Card, Button, Spinner, Dropdown } from 'react-bootstrap';
import { Book, Person, Logout, MenuBook } from '@material-ui/icons';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (userInfo) {
      setUser(userInfo);
      fetchBooks(userInfo.userId);
    } else {
      setLoading(false);
    }
  }, []);

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  async function fetchBooks(userId) {
    try {
      setLoading(true);
      const availableResponse = await axios.get('http://localhost:3001/api/books');
      setAvailableBooks(availableResponse.data.filter(book => book.quantity > 0));

      const borrowedResponse = await axios.get(`http://localhost:3001/api/books/borrowed/${userId}`);
      setBorrowedBooks(borrowedResponse.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBorrow = async (bookId) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/books/borrow',
        { bookId, userId: user.userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBooks(user.userId);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async (bookId) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/books/return', { bookId });
      fetchBooks(user.userId);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <Card className="text-center shadow" style={{ maxWidth: '400px', margin: 'auto' }}>
          <Card.Body className="p-5">
            <Card.Title as="h2" className="mb-4 fw-bold">Welcome to the Library</Card.Title>
            <Card.Text className="mb-4">Please log in to view the dashboard.</Card.Text>
            <Button variant="primary" href="/login" size="lg" className="px-4 py-2">Log In</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="flex items-center">
            <MenuBook className="mr-2" />
            <span className="font-semibold">User Dashboard</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="flex items-center">
                  <Person className="mr-2" />
                  {user?.username || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation('/user-dashboard')} className="flex items-center">
                    <Book className="mr-2" />Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} className="flex items-center">
                    <Logout className="mr-2" />Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              Available Books
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
            </h2>
          </div>
          <p className="text-gray-600 mt-2">Browse and request books to borrow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book._id} className="relative h-96 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <img
                src={book.avatar || '/placeholder-cover.jpg'}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 text-shadow">{book.title}</h3>
                <h4 className="text-sm font-semibold mb-1 opacity-90">By {book.author}</h4>
                <p className="text-sm mb-1 font-semibold">ISBN: {book.isbn}</p>
                <p className="text-sm mb-1 font-semibold">Price: ₹{book.price.toFixed(2)}</p>
                <p className="text-sm mb-1 font-semibold">Quantity: {book.quantity}</p>
                <button
                  onClick={() => handleBorrow(book._id)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Request to Borrow
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UserDashboard;