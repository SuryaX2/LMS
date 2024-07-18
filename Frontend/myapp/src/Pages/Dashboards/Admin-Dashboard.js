import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Table, Modal, Form, Dropdown } from 'react-bootstrap';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    fetchBooks();
  }, [isAuthenticated, navigate]);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/books/get-books')
      .then(res => setBooks(res.data))
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
    axios.delete(`http://localhost:3001/api/books/${bookId}`)
      .then(res => {
        console.log(res.message);
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/books/${editingBook._id}`, editingBook)
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

  return (
    <Container fluid className="p-0">
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button variant="primary" className="me-2" onClick={() => handleNavigation('/add-book')}>
                Add Book
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <img src="https://t3.ftcdn.net/jpg/00/07/32/48/360_F_7324855_mx4CEBWTr81XLOrlQccCROtP2uNR7xbk.jpg" alt="Avatar" width="30" height="30" className="rounded-circle" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation('/admin-dashboard')}>Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-3">Books</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Borrowed By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>₹{book.price}</td>
                <td>{book.quantity}</td>
                <td>{book.borrowedBy ? `${book.borrowedBy.name} (${book.borrowedBy.email})` : 'Available'}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditBook(book)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteBook(book._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editingBook?.title || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={editingBook?.author || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" value={editingBook?.isbn || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editingBook?.price || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={editingBook?.quantity || ''} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;