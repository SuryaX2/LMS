import express, { Router } from 'express';
import Book from '../models/Books.js';

const router = express.Router();

router.get('/books/get-books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

router.get('/books/get-user-books', async (req, res) => {
    try {
      const userBooks = await Book.find({ borrowedBy: { $ne: null } });
      res.json(userBooks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user books' });
    }
  });

router.post('/books-borrow', async (req, res) => {
    const { bookId, userId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (book && book.quantity > 0 && !book.borrowedBy) {
            book.borrowedBy = userId;
            book.borrowedDate = new Date();
            book.quantity -= 1;
            await book.save();
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not available for borrowing' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to borrow book' });
    }
});

router.post('/books-return', async (req, res) => {
    const { bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (book && book.borrowedBy) {
            book.borrowedBy = null;
            book.borrowedDate = null;
            book.returnDate = new Date();
            book.quantity += 1;
            await book.save();
            res.json({ success: true, book });
        } else {
            res.status(404).json({ error: 'Book not found or not borrowed' });
        }
    } catch (err) {
        console.error('Error returning book:', err);
        res.status(500).json({ error: 'Failed to return book' });
    }
});

export default router;
