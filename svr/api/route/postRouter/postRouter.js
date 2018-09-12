"use strict";
exports.__esModule = true;
var express = require("express");
var addPost_1 = require("../../controllers/addPost");
exports.postRouter = express.Router();
exports.postRouter.post('/add-post', addPost_1["default"].AddPost);
