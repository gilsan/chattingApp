"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [
        {
            postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
            post: { type: String },
            created: { type: Date, "default": Date.now() }
        }
    ],
    following: [
        { userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }
    ],
    followers: [
        { follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }
    ],
    notifications: [
        {
            senderid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            message: { type: String },
            viewProfile: { type: Boolean, "default": false },
            created: { type: Date, "default": Date.now() },
            read: { type: Boolean, "default": false },
            date: { type: String, "default": '' }
        }
    ],
    chatList: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            msgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
        }
    ]
});
exports["default"] = mongoose.model('User', userSchema);
