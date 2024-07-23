import express, { Router } from 'express';
import Book from '../models/Books.js';

const router = express.Router();

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
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Book not found or not borrowed' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to return book' });
    }
});

export default router;