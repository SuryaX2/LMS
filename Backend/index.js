import express from "express";
import cors from 'cors';
import userRoutes from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import bookRouter from "./routes/bookRoutes.js";
import bookRequest from "./routes/bookRequest.js";
import connectToMongo from "./db.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectToMongo();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use("/api/auth", userRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/admin/book', bookRequest);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
