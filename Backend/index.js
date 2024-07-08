import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
});
app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
