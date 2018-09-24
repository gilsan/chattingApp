"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, "default": '' },
    post: { type: String, "default": '' },
    imgVersion: { type: String, "default": '' },
    imgId: { type: String, "default": '' },
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String, "default": '' },
            comment: { type: String, "default": '' },
            createdAt: { type: Date, "default": Date.now() }
        }
    ],
    totalLikes: { type: Number, "default": 0 },
    likes: [
        {
            username: { type: String, "default": '' }
        }
    ],
    created: { type: Date, "default": Date.now() }
});
exports["default"] = mongoose.model('Post', postSchema);
