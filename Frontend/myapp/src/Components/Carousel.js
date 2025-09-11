import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CarouselComponent() {
  const carouselStyle = {
    height: "600px",
    overflow: "hidden",
  };

  const imageStyle = {
    height: "600px",
    objectFit: "cover",
    filter: "brightness(0.4)",
  };

  const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2.5rem",
    maxWidth: "600px",
    margin: "0 auto",
  };

  return (
    <div id="home">
      <Carousel className="mb-0" style={carouselStyle}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1560693478-dfdb32f2176a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Learn and Grow"
            style={imageStyle}
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100">
            <div style={captionStyle}>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Learn, Grow, Succeed
              </h1>
              <p
                className="fs-5 mb-4"
                style={{ color: "#e2e8f0", lineHeight: "1.6" }}
              >
                Access thousands of books, interactive content, and join a
                community of learners. Your journey to knowledge starts here.
              </p>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="px-5 py-3"
                  style={{
                    backgroundColor: "#3b82f6",
                    borderColor: "#3b82f6",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                  }}
                >
                  Start Learning Today
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Discover and Learn"
            style={imageStyle}
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100">
            <div style={captionStyle}>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Discover & Achieve
              </h1>
              <p
                className="fs-5 mb-4"
                style={{ color: "#e2e8f0", lineHeight: "1.6" }}
              >
                Explore curated collections that match your interests. Learn at
                your own pace with our innovative digital library platform.
              </p>
              <Button
                variant="outline-light"
                size="lg"
                href="#ourBooks"
                className="px-5 py-3"
                style={{
                  borderColor: "#ffffff",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderWidth: "2px",
                }}
              >
                Explore Collection
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Premium Learning Experience"
            style={imageStyle}
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100">
            <div style={captionStyle}>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Premium Experience
              </h1>
              <p
                className="fs-5 mb-4"
                style={{ color: "#e2e8f0", lineHeight: "1.6" }}
              >
                Experience seamless digital learning with advanced search,
                personalized recommendations, and instant access to your
                favorite books.
              </p>
              <Button
                variant="outline-light"
                size="lg"
                href="#ourBooks"
                className="px-5 py-3"
                style={{
                  borderColor: "#ffffff",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderWidth: "2px",
                }}
              >
                Browse Library
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
