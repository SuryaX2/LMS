import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/solid';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
      fetchBooks(userInfo.userId);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchBooks(userId) {
    try {
      setLoading(true);
      const availableResponse = await axios.get('http://localhost:3001/api/books');
      setAvailableBooks(availableResponse.data.filter(book => book.quantity > 0));

      const borrowedResponse = await axios.get(`http://localhost:3001/api/books/borrowed/${userId}`);
      setBorrowedBooks(borrowedResponse.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleBorrow = async (bookId) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/books/borrow', { bookId, userId: user.userId });
      fetchBooks(user.userId);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async (bookId) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/books/return', { bookId });
      fetchBooks(user.userId);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h2>User Dashboard</h2>
            </div>
            <div className="ml-3 relative">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#home"
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                          >
                            Dashboard
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            onClick={handleLogout}
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Books</h2>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {availableBooks.map((book) => (
                        <tr key={book._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleBorrow(book._id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Borrow
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Borrowed Books</h2>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Borrow Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Return Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {borrowedBooks.map((book) => (
                        <tr key={book._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(book.borrowedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(book.returnDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleReturn(book._id)}
                              className="text-indigo-600 hover:text-indigo-900"
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;