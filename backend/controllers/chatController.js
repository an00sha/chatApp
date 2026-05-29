import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import chat from "../models/chat.js";

const router = Router();

router.post('/create-new-chat', authMiddleware, async (req,res) => {
    try {
        const newChat = new chat(req.body);
        const savedChat = await newChat.save();
        res.status(201).send({
            message: 'Chat created successfully',
            success: true,
            data: savedChat
        });
    } catch (err) {
        res.send({
            message: err.message,
            success: false
        })
    }
})

router.get('/get-all-chats', authMiddleware, async (req,res) => {
    try {
        const allChats = await chat.find({members: {$in: req.userId}});
        res.status(201).send({
            message: 'Chat created successfully',
            success: true,
            data: allChats
        });
    } catch (err) {
        res.send({
            message: err.message,
            success: false
        })
    }
})

export default router;