import express from 'express';
import b1 from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router();
router.use(express.json());

router.post("/signup", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ error: "user already exits" });
        }
        const salt = await b1.genSalt(6);
        const spass = await b1.hash(req.body.password, salt);
        console.log(spass);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: spass,
            role: req.body.role
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_str);
        res.json(authtoken)
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(600).send("Some Error occured");
    }

});

export default router;