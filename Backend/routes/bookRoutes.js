import express from "express"
import { getBooks, borrowBook, returnBook, getUserBooks } from '../controllers/bookController.js';
const router = express.Router();

router.get('/get-books', getBooks);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/user-books/:userId', getUserBooks);

export default router;