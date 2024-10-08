import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const BookCardSlider = () => {
  const [books, setBooks] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';


  const fetchBooks = () => {
    axios.get(`${baseURL}/admin/get-books`)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  });

  return (
    <div id='ourBooks' className="book-card-slider container mx-auto my-1">
      <div className="relative text-center">
        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-blue-500 inline-block pb-2">Our Books</h3>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {books.filter((book) => book.quantity > 0).map((book) => (
          <SwiperSlide key={book._id}>
            <div className="bg-black-500 shadow-lg shadow-white cursor-pointer rounded-lg overflow-hidden h-full mb-5">
              <img
                className="w-full h-96 object-cover object-top opacity-80"
                src={book.avatar}
                alt={book.title}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{book.title}</h3>
                <p className="text-gray-400">Author: {book.author}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCardSlider;