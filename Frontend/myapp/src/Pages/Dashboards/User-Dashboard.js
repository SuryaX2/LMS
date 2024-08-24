import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Navbar, Nav, Dropdown, Modal, Button, Spinner, Tabs, Tab } from 'react-bootstrap';
import { Book, Person, Logout, MenuBook } from '@mui/icons-material';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBooks(), fetchBorrowedBooks()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate, fetchData]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/books');
      return setBooks(res.data);
    } catch (err) {
      return console.log(err);
    }
  };

  const fetchBorrowedBooks = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    try {
      const res = await axios.get(`http://localhost:3001/api/books/borrowed/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return setBorrowedBooks(res.data);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await axios.post('http://localhost:3001/api/books/return', { bookId });
      fetchBooks();
      fetchBorrowedBooks();
      toast.success('You Returned The Book Successfully');
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleBorrow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const confirmBorrow = async () => {
    if (!selectedBook) return;

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user');
      const res = await axios.post('http://localhost:3001/api/admin/book/request',
        { bookId: selectedBook._id, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setShowModal(false);
        toast.success('Request sent to admin for approval.');
        fetchBooks();
      }
    } catch (error) {
      console.error('Error requesting book:', error);
      toast.error('Failed to send request.');
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '1rem',
          background: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
        }}>
          <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
          <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#3a5ccc' }}>Loading...</p>
        </div>
      </div>
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
                  <Person className="mr-2" /> User
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/user-dashboard')} className="flex items-center">
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
        {/* Available Books section */}
        <Tabs defaultActiveKey="available" id="dashboard-tabs" className="mb-4 text-xl font-bold" fill>
          <Tab eventKey="available" title="Available Books">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800 relative">
                  Available Books
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Browse and request books to borrow</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.filter(book => book.quantity > 0).map(book => (
                <div key={book._id} className="relative h-96 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-2">
                  <img
                    src={book.avatar || '/placeholder-cover.jpg'}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-2 text-shadow">{book.title}</h3>
                    <h4 className="text-sm font-semibold mb-1 opacity-90">By {book.author}</h4>
                    <p className="text-sm mb-1 font-semibold">ISBN: {book.isbn}</p>
                    <p className="text-sm mb-1 font-semibold">Price: ₹{book.price.toFixed(2)}</p>
                    <p className="text-sm mb-1 font-semibold">Quantity: {book.quantity}</p>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleBorrow(book)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Request to Borrow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tab>

          {/* Borrowed Books section */}
          <Tab eventKey="borrowed" title="Borrowed Books">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800 relative">
                  Borrowed Books
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-full"></span>
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Books you have currently borrowed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {borrowedBooks.filter(book => book != null).map(book => (
                <div key={book._id} className="relative h-96 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-4">
                  <img
                    src={book.avatar || '/placeholder-cover.jpg'}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-2 text-shadow">{book.title}</h3>
                    <h4 className="text-sm font-semibold mb-1 opacity-90">By {book.author}</h4>
                    <p className="text-sm mb-1 font-semibold">ISBN: {book.isbn}</p>
                    <p className="text-sm mb-1 font-semibold">Price: ₹{book.price.toFixed(2)}</p>
                    <p className="text-sm mb-1 font-semibold">Borrow Date: <span className="text-yellow-300 font-semibold">{new Date(book.borrowedDate).toLocaleDateString()}</span></p>
                    <p className="text-sm mb-1 font-semibold">Return Date: <span className="text-green-300 font-semibold">{new Date(book.returnDate).toLocaleDateString()}</span></p>
                    <Button
                      variant="outline-success"
                      onClick={() => handleReturn(book._id)}
                      className="mt-2 px-4 py-2 w-full text-white"
                    >
                      Return the book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Borrow Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to request to borrow "{selectedBook?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmBorrow}>
            Confirm Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDashboard;