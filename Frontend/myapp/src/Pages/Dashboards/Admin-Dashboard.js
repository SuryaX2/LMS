import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Table, Modal, Form, Dropdown, Card, Row, Col } from 'react-bootstrap';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

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

  const calculateTotalInventory = () => {
    const totalBooks = books.length;
    const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);
    const borrowedBooks = books.filter(book => book.borrowedBy).length;

    return { totalBooks, totalQuantity, totalValue, borrowedBooks };
  };

  const { totalBooks, totalQuantity, totalValue, borrowedBooks } = calculateTotalInventory();

  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home"><MenuBookIcon className="me-2 mb-2" />Admin Dashboard</Navbar.Brand>
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
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <BookIcon style={{ fontSize: 48, color: '#007bff' }} />
                <Card.Title>Total Books</Card.Title>
                <Card.Text className="h2">{totalBooks}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <InventoryIcon style={{ fontSize: 48, color: '#28a745' }} />
                <Card.Title>Total Quantity</Card.Title>
                <Card.Text className="h2">{totalQuantity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <AttachMoneyIcon style={{ fontSize: 48, color: '#ffc107' }} />
                <Card.Title>Total Value</Card.Title>
                <Card.Text className="h2">₹{totalValue.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <LocalLibraryIcon style={{ fontSize: 48, color: '#dc3545' }} />
                <Card.Title>Borrowed Books</Card.Title>
                <Card.Text className="h2">{borrowedBooks}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="mb-4">Book Inventory</h2>
            <Table responsive hover className="align-middle">
              <thead>
                <tr className="bg-light text-center">
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {books.map(book => (
                  <tr key={book._id}>
                    <td><strong>{book.title}</strong></td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>₹{book.price.toFixed(2)}</td>
                    <td>{book.quantity}</td>
                    <td>
                      {book.borrowedBy ? (
                        <span className="text-warning">Borrowed</span>
                      ) : (
                        <span className="text-success">Available</span>
                      )}
                    </td>
                    <td>
                      <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleEditBook(book)}>
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

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            <BookIcon className="me-2 text-success" />
            Edit Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={editingBook?.title || ''} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" name="author" value={editingBook?.author || ''} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control type="text" name="isbn" value={editingBook?.isbn || ''} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" value={editingBook?.price || ''} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" name="quantity" value={editingBook?.quantity || ''} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;