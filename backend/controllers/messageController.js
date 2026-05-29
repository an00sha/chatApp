import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import messages from "../models/messages.js";
import chat from "../models/chat.js";
const router = Router();

router.post('/new-message', authMiddleware, async (req, res) => {
    try {        
        // save message in message collection
        const newMessage = new messages(req.body);
        const savedMessage = await newMessage.save();
        
        // update latest message details in related chat
        // find chat and update last message and increment count by 1
        
        await chat.findByIdAndUpdate({
            _id: req.body.chatId
        }, {
            lastMessage: savedMessage._id,
            $inc: {unreadMessageCount: 1}
        });
        
        res.status(201).send({
            message: "Message sent successfully",
            success: true,
            data: savedMessage
        })
    } catch(err) {
        res.send({
            message: err.message,
            success: false
        });
    }
});

router.get('/get-all-messages/:chatId', authMiddleware, async (req,res) => {
    try {
        const allMessages = await messages.find({chatId: req.params.chatId});
        res.send({
            message: "Messages Fetched Successfully",
            success: true,
            data: allMessages
        })
    } catch(err) {
        res.send({
            message: err.message,
            success: false
        });
    }
})

export default router;