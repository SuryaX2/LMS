import express from 'express';
import router from "express.Router()";

router.get("/", (req, res) => {
    res.send("hello");
});

export default router;