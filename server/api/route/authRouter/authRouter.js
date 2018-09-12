"use strict";
exports.__esModule = true;
var express = require("express");
var auth_1 = require("../../controllers/auth");
exports.authRouter = express.Router();
exports.authRouter.post('/register', auth_1["default"].register);
exports.authRouter.post('/login', auth_1["default"].login);
