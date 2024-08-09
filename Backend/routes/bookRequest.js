// routes/bookRequests.js
import { Router } from 'express';
import BookRequest from '../models/BookRequest.js';
import Book from '../models/Books.js';
import User from '../models/user.js';
import authenticate from '../middleware/authToken.js';

const router = Router();

// Create a new borrow request
router.post('/request', authenticate, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const existingRequest = await BookRequest.findOne({ userId, bookId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'A request for this book is already pending' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.quantity < 1) {
      return res.status(400).json({ error: 'Book is not available for borrowing' });
    }

    const newRequest = new BookRequest({ userId, bookId, status: 'pending' });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating borrow request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all borrow requests for admin
router.get('/borrow-requests', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const requests = await BookRequest.find({ status: 'pending' })
      .populate('userId', 'username')
      .populate('bookId', 'title author');
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Approve a borrow request
router.post('/approve-borrow-request/:id', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const request = await BookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const book = await Book.findById(request.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.quantity < 1) {
      return res.status(400).json({ error: 'Book is not available for borrowing' });
    }

    // Update book quantity and add to user's borrowed books
    book.quantity -= 1;
    await book.save();

    const user = await User.findById(request.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.borrowedBooks.push({
      bookId: book._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });
    await user.save();

    // Update request status
    request.status = 'approved';
    await request.save();

    res.status(200).json({ message: 'Borrow request approved successfully' });
  } catch (error) {
    console.error('Error approving borrow request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Reject a borrow request
router.post('/reject-borrow-request/:id', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const request = await BookRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'rejected';
    await request.save();

    res.status(200).json({ message: 'Borrow request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting borrow request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get borrowed books for a user
router.get('/borrowed-books', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('borrowedBooks.bookId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const borrowedBooks = user.borrowedBooks.map(item => ({
      ...item.bookId.toObject(),
      borrowDate: item.borrowDate,
      dueDate: item.dueDate
    }));

    res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;