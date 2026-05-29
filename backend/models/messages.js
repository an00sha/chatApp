import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId, red: "chats"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('messages', messageSchema);