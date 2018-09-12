"use strict";
exports.__esModule = true;
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require('body-parser');
exports.setGlobalMiddleware = function (app) {
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-with, Control-Type, Accept', 'Authorization');
        next();
    });
    app.use(logger('dev'));
};
