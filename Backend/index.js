import express from "express";
import cors from 'cors';
import userRoutes from "./routes/user.js";
import bookRouter from "./routes/admin.js";
import connectToMongo from "./db.js";

const app = express();
const PORT = 3001;

connectToMongo();

app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);
app.use('/api/books', bookRouter);


app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
