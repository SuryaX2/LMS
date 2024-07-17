import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  borrowedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  borrowedDate: { type: Date, default: null },
  returnDate: { type: Date, default: null }
});

export default model('Book', BookSchema);
