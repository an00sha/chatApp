import { Router } from "express";
import user from "../models/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/get-logged-user', authMiddleware, async(req,res) => {
    try {
        const userDetails = await user.findOne({_id: req.userId});
        res.send({
            message: 'User fetched successfully',
            success: true,
            data: userDetails
        });
    } catch(err) {
        res.status(400).send({
            message: err.message,
            success: false
        })
    }
})

router.get('/get-all-users', authMiddleware, async(req,res) => {
    try {
        const usersDetails = await user.find({_id: {$ne: req.userId}});
        res.send({
            message: 'Users fetched successfully',
            success: true,
            data: usersDetails
        });
    } catch(err) {
        res.send({
            message: err.message,
            success: false
        })
    }
})
export default router;