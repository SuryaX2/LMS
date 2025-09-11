import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const BookCardSlider = () => {
  const [books, setBooks] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

  const fetchBooks = () => {
    axios
      .get(`${baseURL}/admin/get-books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div
      id="ourBooks"
      style={{ backgroundColor: "#0f1419", padding: "5rem 0" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h3 className="display-5 fw-bold mb-3" style={{ color: "#ffffff" }}>
            Our Book Collection
          </h3>
          <p
            className="fs-5 mb-0"
            style={{ color: "#a0aec0", maxWidth: "600px", margin: "0 auto" }}
          >
            Discover thousands of books across various genres and topics
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          style={{
            paddingBottom: "50px",
          }}
        >
          {books
            .filter((book) => book.quantity > 0)
            .map((book) => (
              <SwiperSlide key={book._id}>
                <div
                  className="h-100"
                  style={{
                    backgroundColor: "#1a202c",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #2d3748",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                    height: "450px",
                  }}
                >
                  <div style={{ height: "280px", overflow: "hidden" }}>
                    <img
                      src={book.avatar}
                      alt={book.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h4
                      className="h5 fw-bold mb-2"
                      style={{
                        color: "#ffffff",
                        lineHeight: "1.4",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {book.title}
                    </h4>

                    <p
                      className="mb-3"
                      style={{
                        color: "#a0aec0",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      by {book.author}
                    </p>

                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#065f46",
                          color: "#10b981",
                        }}
                      >
                        Available
                      </span>
                      <span style={{ color: "#6b7280" }}>
                        {book.quantity} copies
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          width: 44px;
          height: 44px;
        }
        .swiper-pagination-bullet {
          background: #64748b;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default BookCardSlider;
