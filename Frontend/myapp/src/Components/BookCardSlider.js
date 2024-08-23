import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookCardSlider = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/admin/get-books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="book-card-slider container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.filter((book)=> book.quantity > 0).map((book) => (
          <div key={book._id} className="bg-white shadow-lg shadow-white cursor-pointer rounded-lg overflow-hidden">
            <img 
              className="w-full h-96 object-cover object-top opacity-100"
              src={book.avatar} 
              alt={book.title} 
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination>
          {[...Array(Math.ceil(books.length / booksPerPage))].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default BookCardSlider;