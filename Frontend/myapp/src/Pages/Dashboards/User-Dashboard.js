import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Navbar, Nav, Dropdown, Modal, Button } from 'react-bootstrap';
import { Book, Person, Logout, MenuBook } from '@mui/icons-material';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchBooks();
      fetchBorrowedBooks();
    }
  }, [isAuthenticated, navigate]);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  const fetchBorrowedBooks = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(user)
    axios.get(`http://localhost:3001/api/books/borrowed/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBorrowedBooks(res.data))
      .catch(err => console.log(err));
  };


  const handleReturn = async (bookId) => {
    const user = localStorage.getItem('user')
    // if (!user) {
    //   console.error('User not logged in');
    //   return;
    // }
    try {
      await axios.post('http://localhost:3001/api/books/return', { bookId });
      fetchBooks(user);
      fetchBorrowedBooks();
      toast.success('You Returned The Book Successfully');
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBorrow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const confirmBorrow = async (selectedBook) => {
    if (!selectedBook) {
      console.log(selectedBook);

      return;
    }

    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const res = await axios.post('http://localhost:3001/api/admin/book/request',
        { bookId: selectedBook._id, userId: user },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);

      if (res.data.success) {
        console.log(res);
        setShowModal(false);
        toast.success('Request sent to admin for approval.');
        fetchBooks(); // Refresh the book list
      }

    } catch (error) {
      console.error('Error requesting book:', error);
      toast.error('Failed to send request.');
    }
  };

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
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
            </h2>
          </div>
          <p className="text-gray-600 mt-2">Browse and request books to borrow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.filter(book => book.quantity > 0).map(book => (
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
                  onClick={() => handleBorrow(book)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Request to Borrow
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-8">
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
                className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2 text-shadow">{book.title}</h3>
                <h4 className="text-sm font-semibold mb-1 opacity-90">By {book.author}</h4>
                <p className="text-sm mb-1 font-semibold">ISBN: {book.isbn}</p>
                <p className="text-sm mb-1 font-semibold">Price: ₹{book.price.toFixed(2)}</p>
                <td className="text-sm mb-1 font-semibold">Borrow Date: <span className="text-yellow-300 font-semibold">{new Date(book.borrowedDate).toLocaleDateString()}</span></td>
                <td className="text-sm mb-1 font-semibold">Return Date: <span className="text-green-300 font-semibold">{new Date(book.returnDate).toLocaleDateString()}</span></td>
                <td className="">
                  <Button
                    variant="outline-success"
                    onClick={() => handleReturn(book._id)}
                    className="mt-2 px-4 py-2 w-full text-white"
                  >
                    Return the book
                  </Button>
                </td>
              </div>
            </div>
          ))}
        </div>
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
          <Button variant="primary" onClick={() => confirmBorrow(selectedBook)}>
            Confirm Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDashboard;
