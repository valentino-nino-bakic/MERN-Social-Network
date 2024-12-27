const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'seen'], default: 'sent' },
});

const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);



module.exports = PrivateMessage;
