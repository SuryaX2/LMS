import express from 'express';

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("hello");
});

export default router;