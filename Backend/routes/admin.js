import express from 'express';
import Book from '../models/Books.js';

const router = express.Router();

router.post('/save-book', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

router.get('/get-books', async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});


export default router;
