"use strict";
exports.__esModule = true;
var express = require("express");
var authRouter_1 = require("./route/authRouter");
var postRouter_1 = require("./route/postRouter");
var usersRouter_1 = require("./route/usersRouter");
var messageRouter_1 = require("./route/messageRouter");
var testRouter_1 = require("./route/testRouter");
exports.restRouter = express.Router();
exports.restRouter.use('/auth', authRouter_1.authRouter);
exports.restRouter.use('/post', postRouter_1.postRouter);
exports.restRouter.use('/users', usersRouter_1.usersRouter);
exports.restRouter.use('/message', messageRouter_1.messageRouter);
exports.restRouter.use('/test', testRouter_1.testRouter);
