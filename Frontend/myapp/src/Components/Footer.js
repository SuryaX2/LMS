import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8" id="about">
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
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest releases and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 text-gray-700 bg-gray-200 rounded-l"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm">
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Address: 123 Book Street, Reading City</li>
            </ul>
            <div className="flex mt-4 space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FacebookIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <LinkedInIcon />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <GitHubIcon />
              </a>
            </div>
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