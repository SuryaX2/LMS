import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <header class="p-3 text-bg-dark">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <img width="9%" src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png" alt="Logo" />
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#home" id="home" class="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="#about" id="about" class="nav-link px-2 text-white">About</a></li>
                    </ul>
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                    </form>
                    <div class="text-end">
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-light me-2">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button type="button" className="btn btn-warning">Sign-up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;