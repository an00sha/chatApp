import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

router.post('/signup', async (req, res) => {
    try {
        //if user already exists 
        const user = await User.findOne({email: req.body.email});
        // if user exists, send an err msg
        if (user) {
            return res.send({
                message: 'User already exists', 
                success: false
            });
        }
        // hash pswd
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create new user, save in DB
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({
            message: 'User Created Sucessfully',
            sucess: true
        })
    } catch(err) {
        res.send({
            message: err.message,
            success: false
        });
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.email);
        // check is user exists
        const user = await User.findOne({email: req.body.email});
        console.log(user);
        if (!user) {
            return res.send({
                message: "User doesn't exist",
                success: false
            })
        }
        // check is pswd matches
        const isPswdMatched = await bcrypt.compare(req.body.password, user.password)
        if (!isPswdMatched) {
            return res.send({
                message: "Password is Invalid",
                success: false
            })
        }
        // if user exists and pswd matches then assign a jwt
        const token = jwt.sign(
            {email: req.body.email, userId: user._id}, 
            process.env.SECRET_KEY, 
            {expiresIn: '1d'}
        );
        console.log(token);
        res.send({
            message: 'User Logged In Succesfully',
            success: true,
            token: token
        });
    } catch(err) {
        res.send({
            message: err.message,
            success: false
        })
    }
})

export default router;