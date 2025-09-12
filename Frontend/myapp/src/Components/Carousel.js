import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Star } from "lucide-react";

function CarouselComponent() {
  const carouselContainerStyles = {
    height: "100vh",
    minHeight: "700px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#0a0f1c",
  };

  const imageStyles = {
    height: "100vh",
    minHeight: "700px",
    objectFit: "cover",
    filter: "brightness(0.35) contrast(1.1)",
    width: "100%",
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(10, 15, 28, 0.7) 0%, rgba(59, 130, 246, 0.15) 100%)",
    zIndex: 1,
  };

  const captionContainerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    width: "100%",
    maxWidth: "800px",
    padding: "0 20px",
  };

  const captionCardStyles = {
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "3rem",
    border: "1px solid rgba(71, 85, 105, 0.3)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
  };

  const primaryButtonStyles = {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: "600",
    padding: "14px 32px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  const secondaryButtonStyles = {
    backgroundColor: "transparent",
    borderColor: "#ffffff",
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: "600",
    padding: "14px 32px",
    borderRadius: "12px",
    borderWidth: "2px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  const headingStyles = {
    color: "#ffffff",
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "1.5rem",
    letterSpacing: "-0.025em",
    lineHeight: "1.1",
  };

  const subheadingStyles = {
    color: "#e2e8f0",
    fontSize: "1.25rem",
    lineHeight: "1.7",
    marginBottom: "2rem",
    fontWeight: "400",
  };

  const badgeStyles = {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    color: "#93c5fd",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginBottom: "1rem",
    display: "inline-block",
    border: "1px solid rgba(59, 130, 246, 0.3)",
  };

  return (
    <section id="home" role="banner" aria-label="Hero carousel">
      <div style={carouselContainerStyles}>
        <Carousel
          className="h-100"
          controls={true}
          indicators={true}
          interval={5000}
          pause="hover"
          fade={true}
        >
          {/* First Slide */}
          <Carousel.Item>
            <div style={overlayStyles} aria-hidden="true"></div>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1560693478-dfdb32f2176a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Students learning and growing in a modern library environment"
              style={imageStyles}
            />
            <Container style={captionContainerStyles}>
              <div style={captionCardStyles}>
                <div style={badgeStyles} aria-label="Learning platform feature">
                  <span className="d-flex align-items-center">
                    <BookOpen size={16} style={{ marginRight: "6px" }} />
                    Learning Platform
                  </span>
                </div>
                <h1 style={headingStyles}>Learn, Grow, Succeed</h1>
                <p style={subheadingStyles}>
                  Access thousands of books, interactive content, and join a
                  community of learners. Your journey to knowledge starts here
                  with our comprehensive digital library.
                </p>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    style={primaryButtonStyles}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 25px rgba(59, 130, 246, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3b82f6";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 20px rgba(59, 130, 246, 0.3)";
                    }}
                    aria-label="Start your learning journey today"
                  >
                    Start Learning Today
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </Container>
          </Carousel.Item>

          {/* Second Slide */}
          <Carousel.Item>
            <div style={overlayStyles} aria-hidden="true"></div>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Discover and explore curated book collections in digital format"
              style={imageStyles}
            />
            <Container style={captionContainerStyles}>
              <div style={captionCardStyles}>
                <div style={badgeStyles} aria-label="Book collection feature">
                  <span className="d-flex align-items-center">
                    <Star size={16} style={{ marginRight: "6px" }} />
                    Curated Collections
                  </span>
                </div>
                <h1 style={headingStyles}>Discover & Achieve</h1>
                <p style={subheadingStyles}>
                  Explore carefully curated collections that match your
                  interests. Learn at your own pace with our innovative digital
                  library platform designed for modern learners.
                </p>
                <Button
                  variant="outline-light"
                  href="#ourBooks"
                  style={secondaryButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 25px rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                  aria-label="Explore our book collection"
                >
                  Explore Collection
                  <ArrowRight size={18} />
                </Button>
              </div>
            </Container>
          </Carousel.Item>

          {/* Third Slide */}
          <Carousel.Item>
            <div style={overlayStyles} aria-hidden="true"></div>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Premium digital learning experience with advanced features"
              style={imageStyles}
            />
            <Container style={captionContainerStyles}>
              <div style={captionCardStyles}>
                <div style={badgeStyles} aria-label="Premium features">
                  <span className="d-flex align-items-center">
                    <Star size={16} style={{ marginRight: "6px" }} />
                    Premium Features
                  </span>
                </div>
                <h1 style={headingStyles}>Premium Experience</h1>
                <p style={subheadingStyles}>
                  Experience seamless digital learning with advanced search,
                  personalized recommendations, and instant access to your
                  favorite books. Elevate your learning journey.
                </p>
                <Button
                  variant="outline-light"
                  href="#ourBooks"
                  style={secondaryButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 25px rgba(255, 255, 255, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                  aria-label="Browse our digital library"
                >
                  Browse Library
                  <ArrowRight size={18} />
                </Button>
              </div>
            </Container>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
}

export default CarouselComponent;
