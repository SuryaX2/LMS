import Book from '../models/Books.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

export const borrowBook = async (req, res) => {
    const { bookId, userId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.quantity < 1) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        book.quantity -= 1;
        book.borrowedBy.push({ user: userId });
        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing book', error: error.message });
    }
};

export const returnBook = async (req, res) => {
    const { bookId, userId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const borrowIndex = book.borrowedBy.findIndex(
            borrow => borrow.user.toString() === userId && !borrow.returnDate
        );

        if (borrowIndex === -1) {
            return res.status(400).json({ message: 'Book was not borrowed by this user' });
        }

        book.borrowedBy[borrowIndex].returnDate = new Date();
        book.quantity += 1;
        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error returning book', error: error.message });
    }
};

export const getUserBooks = async (req, res) => {
    const { userId } = req.params;
    try {
        const books = await Book.find({
            'borrowedBy': {
                $elemMatch: {
                    user: userId,
                    returnDate: null
                }
            }
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user books', error: error.message });
    }
}