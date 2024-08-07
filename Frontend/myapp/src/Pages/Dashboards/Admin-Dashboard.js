import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { MenuBook, Person, Logout, Edit, Delete, Add, Book, AttachMoney, Inventory, LocalLibrary } from '@mui/icons-material';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [requests, setRequests] = useState([]);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    fetchBooks();
    fetchRequests();
  }, [isAuthenticated, navigate]);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/admin/get-books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  const fetchRequests = () => {
    axios.get('http://localhost:3001/api/admin/get-requests')
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setEditModalOpen(true);
  };

  const handleDeleteBook = (bookId) => {
    axios.delete(`http://localhost:3001/api/admin/${bookId}`)
      .then(res => {
        console.log(res.message);
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/admin/${editingBook._id}`, editingBook)
      .then(res => {
        console.log(res.message);
        setEditModalOpen(false);
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  const handleApproveRequest = (requestId, bookId, userId) => {
    axios.post('http://localhost:3001/api/admin/approve-request', { requestId, bookId, userId })
      .then(res => {
        console.log(res.message);
        fetchBooks();
        fetchRequests();
      })
      .catch(err => console.log(err));
  };

  const handleRejectRequest = (requestId) => {
    axios.post('http://localhost:3001/api/admin/reject-request', { requestId })
      .then(res => {
        console.log(res.message);
        fetchRequests();
      })
      .catch(err => console.log(err));
  };

  const calculateTotalInventory = () => {
    const totalBooks = books.length;
    const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);
    const borrowedBooks = books.filter(book => book.borrowedBy).length;

    return { totalBooks, totalQuantity, totalValue, borrowedBooks };
  };

  const { totalBooks, totalQuantity, totalValue, borrowedBooks } = calculateTotalInventory();

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="flex items-center">
            <MenuBook className="mr-2" />
            <span className="font-semibold">Admin Dashboard</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button variant="outline-light" className="mr-2 flex items-center" onClick={() => handleNavigation('/add-book')}>
                <Add className="mr-1" />
                Add Book
              </Button>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="flex items-center">
                  <Person className="mr-2" />
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation('/admin-dashboard')} className="flex items-center">
                    <MenuBook className="mr-2" />Dashboard
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
            <Book style={{ fontSize: 48, color: '#3B82F6' }} />
            <h3 className="text-xl font-semibold mt-2">Total Books</h3>
            <p className="text-3xl font-bold text-blue-500">{totalBooks}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
            <Inventory style={{ fontSize: 48, color: '#10B981' }} />
            <h3 className="text-xl font-semibold mt-2">Total Quantity</h3>
            <p className="text-3xl font-bold text-green-500">{totalQuantity}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
            <AttachMoney style={{ fontSize: 48, color: '#F59E0B' }} />
            <h3 className="text-xl font-semibold mt-2">Total Value</h3>
            <p className="text-3xl font-bold text-yellow-500">₹{totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
            <LocalLibrary style={{ fontSize: 48, color: '#EF4444' }} />
            <h3 className="text-xl font-semibold mt-2">Borrowed Books</h3>
            <p className="text-3xl font-bold text-red-500">{borrowedBooks}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              Book Inventory
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
            </h2>
          </div>
          <p className="text-gray-600 mt-2">Manage your library's collection with ease</p>
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
                <p className="text-sm mb-1  font-semibold opacity-80">ISBN: {book.isbn}</p>
                <p className="text-sm mb-1 font-semibold">Price: <span className="text-yellow-300">₹{book.price.toFixed(2)}</span></p>
                <p className="text-sm mb-1 font-semibold">Quantity: {book.quantity}</p>
                <p className="mb-1 font-semibold">
                  Status: {book.borrowedBy ? (
                    <span className="text-yellow-300 font-semibold">Borrowed</span>
                  ) : (
                    <span className="text-green-300 font-semibold">Available</span>
                  )}
                </p>
                <p className="mb-2 font-semibold">
                  Borrowed By: {book.borrowedBy ? (
                    <span className="text-yellow-300 font-semibold">{book.borrowedBy.username}</span>
                  ) : (
                    <span className="text-green-300 font-semibold">None</span>
                  )}
                </p>
                <div className="flex justify-between mt-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => handleEditBook(book)}
                    className="flex items-center bg-white/20 hover:bg-white/30 transition duration-300"
                  >
                    <Edit fontSize="small" className="mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteBook(book._id)}
                    className="flex items-center bg-red-500/20 hover:bg-red-500/30 transition duration-300"
                  >
                    <Delete fontSize="small" className="mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Requests</h2>
          {requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Book Title</th>
                    <th className="px-4 py-2 border-b border-gray-200">Requested By</th>
                    <th className="px-4 py-2 border-b border-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td className="px-4 py-2 border-b border-gray-200">{request.bookId.title}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{request.userId.username}</td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveRequest(request._id, request.bookId._id, request.userId._id)}
                              className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request._id)}
                              className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {request.status === 'approved' && <span className="text-green-500">Approved</span>}
                        {request.status === 'rejected' && <span className="text-red-500">Rejected</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No book requests at the moment.</p>
          )}
        </div>
      </Container>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editingBook?.title || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={editingBook?.author || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formISBN" className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" value={editingBook?.isbn || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" name="price" value={editingBook?.price || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={editingBook?.quantity || ''} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
