// import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="bg-gray-900 p-3">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <img className="w-24" src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png" alt="Logo" />
                    <nav className="space-x-4">
                        <a href="#home" className="text-gray-400 hover:text-white no-underline">Home</a>
                        <a href="#about" className="text-white hover:text-gray-400 no-underline">About</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <form className="flex items-center">
                        <input type="search" className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded px-4 py-2" placeholder="Search..." aria-label="Search" />
                    </form>
                    <Link to="/login">
                        <button type="button" className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-yellow-600">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600">Sign-up</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
