import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookRequestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

const BookRequest = mongoose.model('BookRequest', BookRequestSchema);
export default BookRequest;
