import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("hello");
});

export default router;