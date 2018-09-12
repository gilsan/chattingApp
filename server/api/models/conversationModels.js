"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var conversationSchema = new Schema({
    participants: [
        {
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ]
});
exports["default"] = mongoose.model('Conversation', conversationSchema);
