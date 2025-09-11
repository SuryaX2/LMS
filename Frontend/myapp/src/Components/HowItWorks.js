import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const HowItWorks = () => {
  const steps = [
    {
      icon: <PersonAddIcon fontSize="large" />,
      title: "Create Account",
      description:
        "Sign up with your email and create your personalized library profile",
      number: "01",
    },
    {
      icon: <SearchIcon fontSize="large" />,
      title: "Discover Books",
      description:
        "Browse our extensive catalog with advanced search and filtering options",
      number: "02",
    },
    {
      icon: <BookmarkAddIcon fontSize="large" />,
      title: "Reserve & Borrow",
      description:
        "Reserve your favorite titles and manage your borrowing history",
      number: "03",
    },
    {
      icon: <MenuBookIcon fontSize="large" />,
      title: "Read & Learn",
      description:
        "Enjoy unlimited access to your books with our reading tools",
      number: "04",
    },
  ];

  return (
    <div style={{ backgroundColor: "#1a202c", padding: "5rem 0" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#ffffff" }}>
            How It Works
          </h2>
          <p
            className="fs-5 mb-0"
            style={{ color: "#a0aec0", maxWidth: "600px", margin: "0 auto" }}
          >
            Getting started with our library is simple and straightforward
          </p>
        </div>

        <Row className="g-4">
          {steps.map((step, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <div
                className="text-center h-100 p-4"
                style={{
                  backgroundColor: "#2d3748",
                  borderRadius: "16px",
                  border: "1px solid #4a5568",
                  position: "relative",
                }}
              >
                <div
                  className="position-absolute top-0 start-0 m-3"
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {step.number}
                </div>

                <div
                  className="mb-4 mt-4"
                  style={{
                    backgroundColor: "#4a5568",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "2rem auto 1.5rem",
                    color: "#3b82f6",
                  }}
                >
                  {step.icon}
                </div>

                <h3 className="h4 fw-bold mb-3" style={{ color: "#ffffff" }}>
                  {step.title}
                </h3>

                <p
                  className="mb-0"
                  style={{
                    color: "#a0aec0",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HowItWorks;
