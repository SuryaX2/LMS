import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='py-3'>
            <Container fluid>
                <Navbar.Brand href="#" className="me-auto">
                    <img
                        src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png"
                        width="80"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <div className="d-flex flex-column flex-lg-row gap-2">
                        <LinkContainer to="/login">
                            <Button variant="outline-light" className="lg:w-100">Login</Button>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Button variant="warning" className="lg:w-100">Sign-up</Button>
                        </LinkContainer>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;