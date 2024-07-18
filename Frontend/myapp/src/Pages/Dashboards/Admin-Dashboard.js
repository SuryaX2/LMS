import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Table, Modal, Form, Dropdown, Card } from 'react-bootstrap';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home"><MenuBookIcon className="me-2" />Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button variant="outline-light" className="me-2" onClick={() => handleNavigation('/add-book')}>
                <AddIcon className="me-1" />Add Book
              </Button>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  <PersonIcon className="me-2" />Admin
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

      <Container>
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="mb-4">Book Inventory</h2>
            <Table responsive hover className="align-middle">
              <thead className="bg-light text-center">
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
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditBook(book)}>
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteBook(book._id)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editingBook?.title || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={editingBook?.author || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" value={editingBook?.isbn || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editingBook?.price || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={editingBook?.quantity || ''} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;