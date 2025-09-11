import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MyNavbar() {
  return (
    <Navbar
      expand="lg"
      className="py-4 shadow-lg"
      style={{
        backgroundColor: "#0f1419",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center me-3"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#3b82f6",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#ffffff"
            }}
          >
            LMS
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #64748b",
            padding: "0.5rem",
          }}
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="#home"
              className="mx-3 fw-medium"
              style={{
                color: "#e2e8f0",
                fontSize: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#how-it-works"
              className="mx-3 fw-medium"
              style={{
                color: "#e2e8f0",
                fontSize: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              How It Works
            </Nav.Link>
            <Nav.Link
              href="#ourBooks"
              className="mx-3 fw-medium"
              style={{
                color: "#e2e8f0",
                fontSize: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              Books
            </Nav.Link>
            <Nav.Link
              href="#testimonials"
              className="mx-3 fw-medium"
              style={{
                color: "#e2e8f0",
                fontSize: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              Reviews
            </Nav.Link>
            <Nav.Link
              href="#about"
              className="mx-3 fw-medium"
              style={{
                color: "#e2e8f0",
                fontSize: "1rem",
                transition: "color 0.3s ease",
              }}
            >
              About
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-3">
            <LinkContainer to="/login">
              <Button
                variant="outline-light"
                className="px-4 py-2"
                style={{
                  borderColor: "#64748b",
                  color: "#e2e8f0",
                  backgroundColor: "transparent",
                  borderWidth: "1.5px",
                  fontWeight: "500",
                }}
              >
                Login
              </Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button
                className="px-4 py-2"
                style={{
                  backgroundColor: "#3b82f6",
                  borderColor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: "500",
                }}
              >
                Sign Up
              </Button>
            </LinkContainer>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;