import express from 'express';
import Book from '../models/Books.js';

const router = express.Router();

// Fetch all available books
router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: null });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all borrowed books for a specific user
router.get('/borrowed', async (req, res) => {
  try {
    const { userId } = req.query;
    const books = await Book.find({ borrowedBy: userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Borrow a book
router.post('/borrow/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.quantity === 0) return res.status(400).json({ message: 'No copies available' });

    book.borrowedBy = userId;
    book.borrowedDate = new Date();
    book.returnDate = null;
    book.quantity -= 1;

    await book.save();
    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return a book
router.post('/return/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.borrowedBy = null;
    book.borrowedDate = null;
    book.returnDate = new Date();
    book.quantity += 1;

    await book.save();
    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
