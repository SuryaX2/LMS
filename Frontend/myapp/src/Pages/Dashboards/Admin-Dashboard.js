import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { MenuBook, Person, Logout, Edit, Delete, Add, Book, AttachMoney, Inventory, LocalLibrary } from '@mui/icons-material';

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
    axios.get('http://localhost:3001/api/admin/get-books')
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

  const calculateTotalInventory = () => {
    const totalBooks = books.length;
    const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);
    const borrowedBooks = books.filter(book => book.borrowedBy).length;

    return { totalBooks, totalQuantity, totalValue, borrowedBooks };
  };

  const { totalBooks, totalQuantity, totalValue, borrowedBooks } = calculateTotalInventory();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <MenuBook className="text-white mr-2" />
              <span className="font-semibold text-white text-lg">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('/add-book')}
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-full flex items-center mr-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Add className="mr-1" />
                Add Book
              </button>
              <div className="relative">
                <button
                  onClick={() => handleNavigation('/admin-dashboard')}
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Person className="mr-1" />
                  Admin
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Logout className="mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Book className="text-blue-500" style={{ fontSize: 48 }} />} title="Total Books" value={totalBooks} color="blue" />
          <StatCard icon={<Inventory className="text-green-500" style={{ fontSize: 48 }} />} title="Total Quantity" value={totalQuantity} color="green" />
          <StatCard icon={<AttachMoney className="text-yellow-500" style={{ fontSize: 48 }} />} title="Total Value" value={`₹${totalValue.toFixed(2)}`} color="yellow" />
          <StatCard icon={<LocalLibrary className="text-red-500" style={{ fontSize: 48 }} />} title="Borrowed Books" value={borrowedBooks} color="red" />
        </div>

        {/* Book Inventory Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
            Book Inventory
            <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-2">Manage your library's collection with ease</p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book._id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
          ))}
        </div>
      </main>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Book</h3>
              <form onSubmit={handleEditSubmit} className="mt-2 text-left">
                <InputField label="Title" name="title" value={editingBook?.title || ''} onChange={handleInputChange} />
                <InputField label="Author" name="author" value={editingBook?.author || ''} onChange={handleInputChange} />
                <InputField label="ISBN" name="isbn" value={editingBook?.isbn || ''} onChange={handleInputChange} />
                <InputField label="Price" name="price" type="number" value={editingBook?.price || ''} onChange={handleInputChange} />
                <InputField label="Quantity" name="quantity" type="number" value={editingBook?.quantity || ''} onChange={handleInputChange} />
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 border-t-4 border-${color}-500`}>
    {icon}
    <h3 className="text-xl font-semibold mt-2 text-gray-800">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-500`}>{value}</p>
  </div>
);

const BookCard = ({ book, onEdit, onDelete }) => (
  <div className="relative h-96 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
    <img
      src={book.avatar || '/placeholder-cover.jpg'}
      alt={book.title}
      className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
      <h3 className="text-2xl font-bold mb-2 text-shadow">{book.title}</h3>
      <p className="text-sm mb-1 opacity-90">By {book.author}</p>
      <p className="text-sm mb-1 opacity-80">ISBN: {book.isbn}</p>
      <p className="text-sm mb-1 font-semibold">Price: <span className="text-yellow-300">₹{book.price.toFixed(2)}</span></p>
      <p className="text-sm mb-1">Quantity: {book.quantity}</p>
      <p className="mb-4">
        Status: {book.borrowedBy ? (
          <span className="text-yellow-300 font-semibold">Borrowed</span>
        ) : (
          <span className="text-green-300 font-semibold">Available</span>
        )}
      </p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(book)}
          className="flex items-center bg-white/20 hover:bg-white/30 transition duration-300 px-3 py-1 rounded-full text-sm"
        >
          <Edit fontSize="small" className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="flex items-center bg-red-500/20 hover:bg-red-500/30 transition duration-300 px-3 py-1 rounded-full text-sm"
        >
          <Delete fontSize="small" className="mr-1" /> Delete
        </button>
      </div>
    </div>
  </div>
);

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

export default AdminDashboard;