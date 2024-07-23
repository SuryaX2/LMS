import Book from '../models/Books.js';

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch books' });
    }
};

exports.getUserBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('borrowedBooks');
        res.json(user.borrowedBooks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user books' });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const book = await Book.findById(req.body.bookId);

        if (!book || user.borrowedBooks.includes(book.id)) {
            return res.status(400).json({ message: 'Cannot borrow this book' });
        }

        user.borrowedBooks.push(book);
        await user.save();

        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Failed to borrow book' });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const bookIndex = user.borrowedBooks.indexOf(req.body.bookId);

        if (bookIndex === -1) {
            return res.status(400).json({ message: 'Cannot return this book' });
        }

        user.borrowedBooks.splice(bookIndex, 1);
        await user.save();

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to return book' });
    }
};