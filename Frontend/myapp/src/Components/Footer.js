import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Footer() {
  const socialLinks = [
    {
      icon: <FacebookIcon />,
      url: "https://www.facebook.com/SuryaSekhar.sharma.1GOD/",
      color: "#1877f2",
    },
    {
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/suryasekhar.sharma.1/",
      color: "#e4405f",
    },
    {
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/in/surya-sekhar-sharma-585908259",
      color: "#0a66c2",
    },
    {
      icon: <GitHubIcon />,
      url: "https://github.com/SuryaX2/",
      color: "#ffffff",
    },
  ];

  return (
    <footer
      id="about"
      style={{ backgroundColor: "#0f1419", borderTop: "1px solid #1e293b" }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="mb-4">
              <h3 className="h4 fw-bold mb-3" style={{ color: "#ffffff" }}>
                About LibraryMS
              </h3>
              <p
                style={{
                  color: "#a0aec0",
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                }}
              >
                We're passionate about connecting readers with exceptional
                books. Our digital library platform offers seamless access to
                thousands of titles, personalized recommendations, and
                innovative reading tools to enhance your learning journey.
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <h4 className="h5 fw-bold mb-3" style={{ color: "#ffffff" }}>
              Quick Links
            </h4>
            <ul className="list-unstyled">
              {[
                "Home",
                "Browse Books",
                "About Us",
                "Contact",
                "Privacy Policy",
              ].map((link, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    style={{
                      color: "#a0aec0",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <h4 className="h5 fw-bold mb-3" style={{ color: "#ffffff" }}>
              Contact Info
            </h4>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <EmailIcon
                  style={{ color: "#3b82f6", marginRight: "0.75rem" }}
                  fontSize="small"
                />
                <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                  contact@libraryms.com
                </span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <PhoneIcon
                  style={{ color: "#3b82f6", marginRight: "0.75rem" }}
                  fontSize="small"
                />
                <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <LocationOnIcon
                  style={{
                    color: "#3b82f6",
                    marginRight: "0.75rem",
                    marginTop: "0.1rem",
                  }}
                  fontSize="small"
                />
                <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                  123 Library Street
                  <br />
                  Knowledge City, KC 12345
                </span>
              </li>
            </ul>
          </div>

          <div className="col-lg-2">
            <h4 className="h5 fw-bold mb-3" style={{ color: "#ffffff" }}>
              Follow Us
            </h4>
            <div className="d-flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#6b7280",
                    fontSize: "1.5rem",
                    textDecoration: "none",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr
          style={{
            borderColor: "#374151",
            margin: "2rem 0 1.5rem",
          }}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p
            className="mb-0"
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
            }}
          >
            © 2024 LibraryMS. All rights reserved. Built with ❤️ by Surya Sekhar
            Sharma
          </p>
          <div className="mt-2 mt-md-0">
            <span
              style={{
                color: "#6b7280",
                fontSize: "0.85rem",
              }}
            >
              Made with React.js & Bootstrap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
