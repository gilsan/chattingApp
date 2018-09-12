"use strict";
exports.__esModule = true;
var express = require("express");
var testPost_1 = require("../../controllers/testPost");
exports.testRouter = express.Router();
exports.testRouter.post('/add-post', testPost_1["default"].AddPost);
