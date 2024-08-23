import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookCardSlider = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/admin/get-books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="book-card-slider container mx-auto my-8">
      <Carousel>
        {books.map((book, index) => (
          <Carousel.Item key={book._id}>
            <div className="flex justify-center">
              <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <img 
                  className="w-full h-48 object-cover object-center"
                  src={book.coverImage} 
                  alt={book.title} 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className={`mt-2 ${book.borrowedBy ? 'text-red-500' : 'text-green-500'}`}>
                    Status: {book.borrowedBy ? 'Borrowed' : 'Available'}
                  </p>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BookCardSlider;