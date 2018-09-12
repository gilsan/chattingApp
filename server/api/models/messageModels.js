"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: String },
    receiver: { type: String },
    message: [
        {
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            sendername: { type: String },
            receivername: { type: String },
            body: { type: String, "default": '' },
            isRead: { type: Boolean, "default": false },
            createAt: { type: Date, "default": Date.now() }
        }
    ]
});
exports["default"] = mongoose.model('Message', messageSchema);
