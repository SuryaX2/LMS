import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
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
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="max-w-full p-1 bg-white rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex justify-between items-center">
            <div className="mr-2">
              <button onClick={() => handleNavigation('/add-book')} className="px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">➕ Add Book</button>
            </div>
            <div className="relative">
              <button className="focus:outline-none" onClick={handleDropdownToggle}>
                <img src="https://t3.ftcdn.net/jpg/00/07/32/48/360_F_7324855_mx4CEBWTr81XLOrlQccCROtP2uNR7xbk.jpg" alt="Avatar" className="w-20 h-20 rounded-full" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button onClick={() => handleNavigation('/admin-dashboard')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Dashboard</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Books</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed By</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map(book => (
              <tr key={book._id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">₹{book.price}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{book.quantity}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {book.borrowedBy ? `${book.borrowedBy.name} (${book.borrowedBy.email})` : 'Available'}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button onClick={() => handleEditBook(book)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">Edit</button>
                  <button onClick={() => handleDeleteBook(book._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-5 mx-auto p-5 border w-1/2 shadow-lg rounded-2xl bg-white">
            <h3 className="text-center font-bold mb-4">Edit Book</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingBook.title}
                  onChange={handleInputChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={editingBook.author}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={editingBook.isbn}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={editingBook.price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editingBook.quantity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;