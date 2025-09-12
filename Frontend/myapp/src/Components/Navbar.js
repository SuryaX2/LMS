import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BookOpen, Menu } from "lucide-react";

function MyNavbar() {
  const navbarStyles = {
    backgroundColor: "#0a0f1c",
    borderBottom: "1px solid #1e2a3a",
    backdropFilter: "blur(20px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  };

  const brandStyles = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "-0.025em",
  };

  const logoContainerStyles = {
    width: "48px",
    height: "48px",
    backgroundColor: "#3b82f6",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  };

  const navLinkStyles = {
    color: "#cbd5e1",
    fontSize: "0.95rem",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.2s ease",
  };

  const loginButtonStyles = {
    backgroundColor: "transparent",
    borderColor: "#475569",
    color: "#cbd5e1",
    borderWidth: "1px",
    borderRadius: "8px",
    fontWeight: "500",
    padding: "10px 20px",
    transition: "all 0.2s ease",
  };

  const signupButtonStyles = {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    color: "#ffffff",
    borderRadius: "8px",
    fontWeight: "600",
    padding: "10px 20px",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    transition: "all 0.2s ease",
  };

  const togglerStyles = {
    backgroundColor: "transparent",
    border: "1px solid #475569",
    borderRadius: "6px",
    padding: "8px",
  };

  return (
    <header role="banner">
      <Navbar
        expand="lg"
        fixed="top"
        className="py-3"
        style={navbarStyles}
        aria-label="Main navigation"
      >
        <Container fluid className="px-4">
          {/* Brand/Logo Section */}
          <Navbar.Brand
            href="#home"
            style={brandStyles}
            aria-label="Library Management System - Go to homepage"
          >
            <div style={logoContainerStyles} aria-hidden="true">
              <BookOpen size={24} color="#ffffff" />
            </div>
            <span>LMS</span>
          </Navbar.Brand>

          {/* Mobile Menu Toggle */}
          <Navbar.Toggle
            aria-controls="navbar-nav"
            aria-label="Toggle navigation menu"
            style={togglerStyles}
          >
            <Menu size={20} color="#cbd5e1" />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            {/* Navigation Links */}
            <Nav
              className="mx-auto"
              as="nav"
              role="navigation"
              aria-label="Primary navigation"
            >
              <Nav.Link
                href="#home"
                className="mx-2"
                style={navLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#how-it-works"
                className="mx-2"
                style={navLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                How It Works
              </Nav.Link>
              <Nav.Link
                href="#ourBooks"
                className="mx-2"
                style={navLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Books
              </Nav.Link>
              <Nav.Link
                href="#testimonials"
                className="mx-2"
                style={navLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Reviews
              </Nav.Link>
              <Nav.Link
                href="#about"
                className="mx-2"
                style={navLinkStyles}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffffff";
                  e.target.style.backgroundColor = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                About
              </Nav.Link>
            </Nav>

            {/* Authentication Buttons */}
            <div className="d-flex gap-2 ms-lg-3">
              <LinkContainer to="/login">
                <Button
                  variant="outline-light"
                  style={loginButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#1e293b";
                    e.target.style.borderColor = "#64748b";
                    e.target.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "#475569";
                    e.target.style.color = "#cbd5e1";
                  }}
                  aria-label="Login to your account"
                >
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button
                  style={signupButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#2563eb";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(59, 130, 246, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#3b82f6";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 2px 8px rgba(59, 130, 246, 0.3)";
                  }}
                  aria-label="Create a new account"
                >
                  Sign Up
                </Button>
              </LinkContainer>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default MyNavbar;
