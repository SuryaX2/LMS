import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;

function logger(req, res, next) { 
    console.log("request method : ", req.method);
    console.log("request url : ", req.url);
    next();
};

app.use(logger);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index1.html");
// });

app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
