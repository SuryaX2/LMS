import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Modal, Form, Dropdown, Table, Spinner, FormControl } from 'react-bootstrap';
import { MenuBook, Person, Logout, Edit, Delete, Add, Book, AttachMoney, Inventory, LocalLibrary, Visibility } from '@mui/icons-material';
import { Check2, X } from 'react-bootstrap-icons';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [showBorrowRequestsModal, setShowBorrowRequestsModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingBook, setViewingBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  const navigate = useNavigate();

  // const fetchData = useCallback(async () => {
  //   setIsLoading(true);

  //   const fetchBooks = async () => {
  //     try {
  //       const res = await axios.get(`${baseURL}/admin/get-books`);
  //       return setBooks(res.data);
  //     } catch (err) {
  //       return console.log(err);
  //     }
  //   };

  //   const fetchBorrowRequests = async () => {
  //     try {
  //       const res = await axios.get(`${baseURL}/admin/book/borrow-requests`);
  //       return setBorrowRequests(res.data);
  //     } catch (err) {
  //       console.error('Error fetching borrow requests:', err);
  //       toast.error('Failed to fetch borrow requests');
  //     }
  //   };

  //   try {
  //     await Promise.all([fetchBooks(), fetchBorrowRequests()]);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     toast.error('Failed to load data');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [baseURL]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const [booksRes, requestsRes] = await Promise.all([
        axios.get(`${baseURL}/admin/get-books`),
        axios.get(`${baseURL}/admin/book/borrow-requests`)
      ]);

      setBooks(booksRes.data);
      setBorrowRequests(requestsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [baseURL]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setEditModalOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${baseURL}/admin/${bookId}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      toast.success('Book deleted successfully');
    } catch (err) {
      console.error('Error deleting book:', err);
      toast.error('Failed to delete book');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${baseURL}/admin/${editingBook._id}`, editingBook);
      setBooks(prevBooks => prevBooks.map(book => book._id === editingBook._id ? res.data : book));
      setEditModalOpen(false);
      toast.success('Book updated successfully');
    } catch (err) {
      console.error('Error updating book:', err);
      toast.error('Failed to update book');
    }
  };

  const handleInputChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  const handleApproveBorrowRequest = async (requestId) => {
    try {
      await axios.post(`${baseURL}/admin/book/approve-borrow-request/${requestId}`);
      setBorrowRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
      toast.success('Borrow request approved successfully');
    } catch (error) {
      console.error('Error approving borrow request:', error);
      toast.error('Failed to approve borrow request');
    }
  };

  const handleRejectBorrowRequest = async (requestId) => {
    try {
      await axios.post(`${baseURL}/admin/book/reject-borrow-request/${requestId}`);
      setBorrowRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
      toast.success('Borrow request rejected successfully');
    } catch (error) {
      console.error('Error rejecting borrow request:', error);
      toast.error('Failed to reject borrow request');
    }
  };

  const handleViewBook = (book) => {
    setViewingBook(book);
    setViewModalOpen(true);
  };

  const filteredBooks = searchQuery
    ? books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : books;

  const calculateTotalInventory = () => {
    const totalBooks = books.length;
    const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);
    const borrowedBooks = books.filter(book => book.borrowedBy).length;

    return { totalBooks, totalQuantity, totalValue, borrowedBooks };
  };

  const { totalBooks, totalQuantity, totalValue, borrowedBooks } = calculateTotalInventory();


  return (
    <div className="bg-gray-800 min-h-screen font-sans text-white">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="bg-gray-800 min-h-screen font-sans text-white">
          <Navbar bg="gray-900" variant="dark" expand="lg" className="mb-4 shadow-lg">
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
                  <Button variant="outline-light" className="mr-2 flex items-center" onClick={() => setShowBorrowRequestsModal(true)}>
                    <Book className="mr-1" />
                    Borrow Requests
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

          <Container className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* stats div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
                <Book style={{ fontSize: 48, color: '#60A5FA' }} />
                <h3 className="text-xl font-semibold mt-2 text-gray-200">Total Books</h3>
                <p className="text-3xl font-bold text-blue-400">{totalBooks}</p>
              </div>
              <div className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
                <Inventory style={{ fontSize: 48, color: '#34D399' }} />
                <h3 className="text-xl font-semibold mt-2 text-gray-200">Total Quantity</h3>
                <p className="text-3xl font-bold text-green-400">{totalQuantity}</p>
              </div>
              <div className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
                <AttachMoney style={{ fontSize: 48, color: '#FBBF24' }} />
                <h3 className="text-xl font-semibold mt-2 text-gray-200">Total Value</h3>
                <p className="text-3xl font-bold text-yellow-400">₹{totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105">
                <LocalLibrary style={{ fontSize: 48, color: '#F87171' }} />
                <h3 className="text-xl font-semibold mt-2 text-gray-200">Borrowed Books</h3>
                <p className="text-3xl font-bold text-red-400">{borrowedBooks}</p>
              </div>
            </div>
            {/* book inventory div */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold text-white mb-4 border-b-2 border-blue-500 inline-block pb-2">
                  Book Inventory
                </h2>
                <div className="relative w-64">
                  <FormControl
                    type="search"
                    style={{ backgroundColor: 'rgb(255 255 255 / 15%)' }}
                    className="form-control w-full text-white"
                    placeholder="Search by title or author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-gray-300 mt-2">Manage your library's collection with ease</p>
            </div>
            {/* book card div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <div key={book._id} className="relative h-96 mb-3 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl group">
                  <img
                    src={book.avatar || '/placeholder-cover.jpg'}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-16 group-hover:translate-y-0 transition-transform duration-300">
                    <h1 className="text-3xl font-bold mb-2 text-shadow">{book.title}</h1>
                    <h4 className="text-sm font-semibold mb-4 opacity-90">~ {book.author}</h4>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => handleViewBook(book)}
                        className="flex items-center bg-white/20 hover:bg-white/30 transition duration-300"
                      >
                        <Visibility fontSize="small" className="mr-1" /> View
                      </Button>
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
          </Container>

          {/* View Modal */}
          <Modal
            show={viewModalOpen}
            onHide={() => setViewModalOpen(false)}
            centered
            size="lg"
            className="book-details-modal"
          >
            <div className="modal-content bg-white rounded-lg overflow-hidden shadow-lg">
              <Modal.Header closeButton className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-b-0">
                <Modal.Title className="text-xl font-bold">Book Details</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0">
                <div className="flex h-[500px]">
                  <div className="w-2/5 relative">
                    <img
                      src={viewingBook?.avatar || '/placeholder-cover.jpg'}
                      alt={viewingBook?.title}
                      className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                  </div>
                  <div className="w-3/5 p-6 bg-white flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">{viewingBook?.title}</h2>
                      <p className="text-lg text-gray-600 mb-4 italic">By {viewingBook?.author}</p>
                      <div className="w-12 h-1 bg-blue-500 mb-4"></div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-semibold text-gray-700 text-sm">ISBN</span>
                          <span className="text-gray-800 text-sm">{viewingBook?.isbn}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-semibold text-gray-700 text-sm">Price</span>
                          <span className="text-green-600 font-bold text-sm">₹{viewingBook?.price?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-semibold text-gray-700 text-sm">Quantity</span>
                          <span className="text-gray-800 text-sm">{viewingBook?.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Current Status</p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 text-sm">Availability</span>
                        {viewingBook?.borrowedBy ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Borrowed</span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Available</span>
                        )}
                      </div>
                      {viewingBook?.borrowedBy && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-gray-700 text-sm">Borrowed By</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{viewingBook.borrowedBy.username}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </div>
          </Modal>

          {/* Edit Modal */}
          <Modal show={editModalOpen}
            onHide={() => setEditModalOpen(false)}
            centered
          >
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

          {/* borrow request Modal */}
          <Modal
            show={showBorrowRequestsModal}
            onHide={() => setShowBorrowRequestsModal(false)}
            size="xl"
            centered
          >
            <Modal.Header closeButton className="bg-success text-white">
              <Modal.Title className="w-100 text-center">Borrow Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              {borrowRequests.length > 0 ? (
                <Table responsive hover className="m-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center">Book Title</th>
                      <th className="text-center">Author</th>
                      <th className="text-center">Requested By</th>
                      <th className="text-center">Request Date</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowRequests.map((request) => (
                      <tr key={request._id}>
                        <td className="text-center align-middle">{request.bookId.title}</td>
                        <td className="text-center align-middle">{request.bookId.author}</td>
                        <td className="text-center align-middle">{request.userId.username}</td>
                        <td className="text-center align-middle">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-center align-middle">
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleApproveBorrowRequest(request._id)}
                          >
                            <Check2 size={18} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRejectBorrowRequest(request._id)}
                          >
                            <X size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted py-4">No borrow requests at the moment.</p>
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
