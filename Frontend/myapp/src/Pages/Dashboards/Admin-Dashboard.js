import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, CheckIcon, XCircleIcon } from '@heroicons/react/solid';
import { MenuBook, Person, Logout, Edit, Delete, Add, Book, AttachMoney, Inventory, LocalLibrary } from '@mui/icons-material';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [requests, setRequests] = useState([]);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [showBorrowRequestsModal, setShowBorrowRequestsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    fetchBooks();
    fetchBorrowRequests();
  }, [isAuthenticated, navigate]);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/admin/get-books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  const fetchRequests = () => {
    axios.get('http://localhost:3001/api/admin/book/borrow-requests')
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

  const fetchBorrowRequests = () => {
    axios.get('http://localhost:3001/api/admin/book/borrow-requests')
      .then(res => setBorrowRequests(res.data))
      .catch(err => {
        console.error('Error fetching borrow requests:', err);
        toast.error('Failed to fetch borrow requests');
      });
  };

  const handleApproveBorrowRequest = async (requestId) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/admin/book/approve-borrow-request/${requestId}`);
      console.log(res);

      fetchBorrowRequests();
      fetchBooks();
      setReviewModal(false);
      toast.success('Borrow request approved successfully');
    } catch (error) {
      console.error('Error approving borrow request:', error);
      toast.error('Failed to approve borrow request');
    }
  };

  const handleRejectBorrowRequest = async (requestId) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/book/reject-borrow-request/${requestId}`);
      fetchBorrowRequests();
      setReviewModal(false);
      toast.success('Borrow request rejected successfully');
    } catch (error) {
      console.error('Error rejecting borrow request:', error);
      toast.error('Failed to reject borrow request');
    }
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
        {/* book inventory div */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800 relative">
              Book Inventory
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
            </h2>
          </div>
          <p className="text-gray-600 mt-2">Manage your library's collection with ease</p>
        </div>
        {/* book card div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        {/* borrow request div */}
      </Container>

      {/* Edit Modal */}
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

      {/* borrow request Modal */}
      <Transition.Root show={showBorrowRequestsModal} as={React.Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setShowBorrowRequestsModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowBorrowRequestsModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Borrow Requests
                  </Dialog.Title>
                  <div className="mt-2">
                    {borrowRequests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Book Title
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Requested By
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Request Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {borrowRequests.map((request) => (
                              <tr key={request._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.bookId.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.bookId.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.userId.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => handleApproveBorrowRequest(request._id)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectBorrowRequest(request._id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No borrow requests at the moment.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

      {/* confirm borrow request Modal */}
      {/* <Modal show={reviewModal} onHide={() => setReviewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review Borrow Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Book:</strong> {selectedRequest?.bookId.title}</p>
          <p><strong>Requested By:</strong> {selectedRequest?.userId.username}</p>
          <p><strong>Request Date:</strong> {selectedRequest ? new Date(selectedRequest.createdAt).toLocaleDateString() : ''}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReviewModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleRejectBorrowRequest(selectedRequest?._id)}>
            Reject
          </Button>
          <Button variant="success" onClick={() => handleApproveBorrowRequest(selectedRequest?._id)}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AdminDashboard;
