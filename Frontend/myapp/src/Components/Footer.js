import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are passionate about bringing the best books to our readers.
              Explore our vast collection and embark on new literary adventures.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Categories</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">New Releases</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Best Sellers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm">
              <li className="mb-2">Email: info@bookstore.com</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Address: 123 Book Street, Reading City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; 2024 Your Bookstore Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;