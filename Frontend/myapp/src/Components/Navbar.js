import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="bg-gray-900 p-3">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-center lg:justify-between">
                    <img width="9%" src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png" alt="Logo" />
                    <ul className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-2 lg:mb-0">
                        <li><a href="#home" id="home" className="nav-link px-2 text-gray-400">Home</a></li>
                        <li><a href="#about" id="about" className="nav-link px-2 text-white">About</a></li>
                    </ul>
                    <form className="w-full lg:w-auto mb-3 lg:mb-0 lg:ml-3" role="search">
                        <input type="search" className="form-control bg-gray-800 text-white placeholder-gray-500 border-none rounded" placeholder="Search..." aria-label="Search" />
                    </form>
                    <div className="text-end">
                        <Link to="/login">
                            <button type="button" className="btn bg-transparent border border-white text-white mr-2 px-4 py-2 rounded">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button type="button" className="btn bg-yellow-500 text-gray-900 px-4 py-2 rounded">Sign-up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
