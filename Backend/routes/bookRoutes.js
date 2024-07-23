import express from "express"
const router = express.Router();
import bookController from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/books', authMiddleware, bookController.getBooks);
router.get('/user/books', authMiddleware, bookController.getUserBooks);
router.post('/books/borrow', authMiddleware, bookController.borrowBook);
router.post('/books/return', authMiddleware, bookController.returnBook);

export default router;