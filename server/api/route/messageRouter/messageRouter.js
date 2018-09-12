"use strict";
exports.__esModule = true;
var express = require("express");
var message_1 = require("../../controllers/message");
var AuthHelper_1 = require("../../helpers/AuthHelper");
exports.messageRouter = express.Router();
exports.messageRouter.post('/chat-message/:senderId/:receiverId', AuthHelper_1["default"].VerifyToken, message_1["default"].SendMessage);
