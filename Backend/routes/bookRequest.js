// routes/bookRequests.js
import { Router } from 'express';
const router = Router();
import BookRequest, { find, findByIdAndUpdate } from '../models/BookRequest';

// Create a new book request
router.post('/request', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const newRequest = new BookRequest({ userId, bookId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all book requests for admin
router.get('/requests', async (req, res) => {
  try {
    const requests = await find().populate('userId').populate('bookId');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Approve or reject a book request
router.put('/request/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
