import express from "express";

const app = express();
const PORT = 3001;
import userRoutes from "./routes/user.js"

// app.get("/", (req, res) => {
//     res.send("Hello");
// });

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
