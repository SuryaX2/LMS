import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req,res) => {
    res.send("<h1>Surya Homepage</h1>");
});
app.get("/about", (req,res) => {
    res.send("<h1>Surya About-page</h1>");
});
app.listen(PORT, () => {
   console.log(`Server Listening at ${PORT}`); 
});
