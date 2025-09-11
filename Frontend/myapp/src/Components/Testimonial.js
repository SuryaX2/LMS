import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Graduate Student",
      rating: 5,
      text: "This library system has completely transformed how I access and manage my research materials. The interface is intuitive and the book selection is outstanding.",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      rating: 5,
      text: "The personalized recommendations have introduced me to books I never would have discovered. It feels like having a personal librarian who knows exactly what I need.",
    },
    {
      name: "Emily Rodriguez",
      role: "Research Assistant",
      rating: 5,
      text: "As someone who relies heavily on academic resources, this platform has been invaluable. The search functionality and digital access have streamlined my entire workflow.",
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        style={{
          color: index < rating ? "#fbbf24" : "#374151",
          fontSize: "1.2rem",
        }}
      />
    ));
  };

  return (
    <div id="testimonials" style={{ backgroundColor: "#1a202c", padding: "5rem 0" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#ffffff" }}>
            What Our Users Say
          </h2>
          <p
            className="fs-5 mb-0"
            style={{ color: "#a0aec0", maxWidth: "600px", margin: "0 auto" }}
          >
            Join thousands of satisfied users who have transformed their
            learning experience
          </p>
        </div>

        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col key={index} xs={12} md={4}>
              <Card
                className="h-100 border-0"
                style={{
                  backgroundColor: "#2d3748",
                  color: "#ffffff",
                  borderRadius: "16px",
                  padding: "1rem",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">{renderStars(testimonial.rating)}</div>

                  <Card.Text
                    className="flex-grow-1 mb-4"
                    style={{
                      color: "#e2e8f0",
                      lineHeight: "1.6",
                      fontSize: "1rem",
                    }}
                  >
                    "{testimonial.text}"
                  </Card.Text>

                  <div className="d-flex align-items-center">
                    <div>
                      <Card.Title
                        className="mb-1 h6"
                        style={{ color: "#ffffff", fontWeight: "600" }}
                      >
                        {testimonial.name}
                      </Card.Title>
                      <p className="mb-0 small" style={{ color: "#a0aec0" }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Testimonials;
