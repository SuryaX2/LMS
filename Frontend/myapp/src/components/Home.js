import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Carousel, Button } from 'react-bootstrap';
import '../Home.css';

function Home() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Library+1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Our Library</h3>
            <p>Explore a wide range of books and resources.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Library+2"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Discover New Knowledge</h3>
            <p>Stay ahead with the latest information.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Library+3"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Join Our Community</h3>
            <p>Connect with other book lovers.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="home-content">
        <h1>Welcome to the Library Management System</h1>
        <div className="button-container">
          <Link to="/login">
            <Button variant="primary" className="home-button">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" className="home-button">Signup</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
