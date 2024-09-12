import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        price: '',
        quantity: '',
        avatar: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleInputChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0];
            setBook({ ...book, avatar: file });
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        } else {
            setBook({ ...book, [e.target.name]: e.target.value });
        }
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        for (const key in book) {
            if (book[key] !== null && book[key] !== undefined) {
                formData.append(key, book[key]);
            }
        }

        axios.post(`${baseURL}/admin/save-book`, formData)
            .then(res => {
                setBook({
                    title: '',
                    author: '',
                    isbn: '',
                    price: '',
                    quantity: '',
                    avatar: null
                });
                setPreviewUrl(null);
                setIsLoading(false);
                navigate('/admin-dashboard');
            })
            .catch(err => {
                console.error('Error adding book:', err.response ? err.response.data : err);
                setIsLoading(false);
                toast.error('Error adding book: ' + (err.response ? err.response.data : err.message));
            });
    };

    const inputStyle = {
        backgroundColor: '#162738',
        color: '#f5f6f7',
        border: '1px solid #718096',
    };

    return (
        <Container fluid className="bg-gray-800 min-vh-100 d-flex align-items-center justify-content-center py-5">
            <Card className="shadow-lg" style={{ maxWidth: '900px', width: '100%', backgroundColor: '#1b212b', color: '#e2e8f0' }}>
                <Card.Body className="p-5">
                    <Row>
                        <Col md={5} className="mb-4 mb-md-0">
                            <div className="h-100 d-flex flex-column justify-content-center align-items-center bg-gray-700 rounded p-4" style={{ minHeight: '400px',backgroundColor: '#1b212b'}}>
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Book avatar preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
                                    />
                                ) : (
                                    <>
                                        <BookIcon style={{ fontSize: 100, color: '#a0aec0' }} />
                                        <h2 className="mt-4 text-center text-gray-300">Add a New Book</h2>
                                        <p className="text-center mt-3 text-gray-400">Expand your library with new titles</p>
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col md={7}>
                            <Form onSubmit={handleAddBook}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-gray-300">Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={book.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter book title"
                                        style={inputStyle}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-gray-300">Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        value={book.author}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter author name"
                                        style={inputStyle}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-gray-300">ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={book.isbn}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter ISBN"
                                        style={inputStyle}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-gray-300">Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={book.price}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter price"
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-gray-300">Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantity"
                                                // value={book.quantity}
                                                value='1'
                                                readOnly
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter quantity"
                                                style={inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-gray-300">Upload Avatar</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="avatar"
                                        onChange={handleInputChange}
                                        required
                                        accept="image/*"
                                        style={inputStyle}
                                    />
                                </Form.Group>
                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" size="lg" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                                        {isLoading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Adding Book...
                                            </>
                                        ) : (
                                            <>
                                                <AddIcon className="me-2 mb-1" /> Add Book
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddBook;