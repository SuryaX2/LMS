// src/components/AdminDashboard.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistory();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (path) => {
    history.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-6 bg-white rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="relative">
            <button
              className="focus:outline-none"
              onClick={handleDropdownToggle}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation('/logout')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => handleNavigation('/add-book')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDashboard;
