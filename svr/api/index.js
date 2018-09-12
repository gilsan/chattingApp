"use strict";
exports.__esModule = true;
var express = require("express");
var postRouter_1 = require("./route/postRouter");
exports.restRouter = express.Router();
exports.restRouter.use('/post', postRouter_1.postRouter);
