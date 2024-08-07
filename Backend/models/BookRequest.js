import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const BookRequestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default model('BookRequest', BookRequestSchema);
