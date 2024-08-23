import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 py-12" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4 border-b-2 border-blue-500 inline-block pb-2">About Us</h3>
            <p className="text-base leading-relaxed">
              We are passionate about bringing the best books to our readers.
              Explore our vast collection and embark on new literary adventures.
              Our goal is to inspire, educate, and entertain through the power of literature.
            </p>
          </div>
          <div className="space-y-6 text-right">
            <h3 className="text-2xl font-bold text-white mb-4 border-b-2 border-blue-500 inline-block pb-2">Connect With Us</h3>
            <div className="flex space-x-6 justify-end">
              <a href="https://www.facebook.com/SuryaSekhar.sharma.1GOD/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FacebookIcon fontSize="large" />
              </a>
              <a href="https://www.instagram.com/suryasekhar.sharma.1/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="https://www.linkedin.com/in/surya-sekhar-sharma-585908259" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="https://github.com/SuryaX2/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-300">
                <GitHubIcon fontSize="large" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-center">
          <p className="text-gray-400">&copy; 2024 LMS @Surya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;