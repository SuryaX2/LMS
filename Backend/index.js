import express from "express";
import userRoutes from "./routes/user.js"

const app = express();
const PORT = 3001;

app.use("/api/auth", userRoutes);
// app.get("/", (req, res) => {
//     res.send("Hello");
// });

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
