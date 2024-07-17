import express from 'express';
import Book from '../models/Books.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

export default router;
