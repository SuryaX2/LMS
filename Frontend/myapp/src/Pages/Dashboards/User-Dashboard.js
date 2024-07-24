import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const availableBooks = await axios.get('http://localhost:3001/api/books/available');
      const userId = getCurrentUserId();
      const borrowedBooks = await axios.get('http://localhost:3001/api/books/borrowed', {
        params: { userId }
      });
      setBooks(availableBooks.data);
      setBorrowedBooks(borrowedBooks.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user._id : null;
  };

  const handleBorrowBook = async (bookId) => {
    try {
      const userId = getCurrentUserId();
      await axios.post(`http://localhost:3001/api/books/borrow/${bookId}`, { userId });

      // Update state immediately
      setBooks((prevBooks) => {
        return prevBooks.map((book) => {
          if (book._id === bookId) {
            return { ...book, quantity: book.quantity - 1 };
          }
          return book;
        }).filter(book => book.quantity > 0);
      });
      setBorrowedBooks((prevBorrowedBooks) => [
        ...prevBorrowedBooks,
        books.find(book => book._id === bookId)
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:3001/api/books/return/${bookId}`);

      // Update state immediately
      setBorrowedBooks((prevBorrowedBooks) => prevBorrowedBooks.filter(book => book._id !== bookId));
      setBooks((prevBooks) => {
        const returnedBook = borrowedBooks.find(book => book._id === bookId);
        if (returnedBook) {
          return [...prevBooks, { ...returnedBook, quantity: returnedBook.quantity + 1 }];
        }
        return prevBooks;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl">LMS Dashboard</div>
          <div className="relative">
            <img
              src="/path/to/avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <button
                  className="block px-4 py-2 text-gray-800 w-full text-left hover:bg-gray-100"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 w-full text-left hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Books</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Author</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="py-2">{book.title}</td>
                <td className="py-2">{book.author}</td>
                <td className="py-2">{book.quantity}</td>
                <td className="py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleBorrowBook(book._id)}
                    disabled={book.quantity === 0}
                  >
                    {book.quantity > 0 ? 'Borrow' : 'Out of Stock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-bold mt-8 mb-4">Borrowed Books</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Author</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book._id}>
                <td className="py-2">{book.title}</td>
                <td className="py-2">{book.author}</td>
                <td className="py-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReturnBook(book._id)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
