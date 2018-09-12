"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var global_middleware_1 = require("./api/middlewares/global-middleware");
var secrete_1 = require("./api/config/secrete");
var api_1 = require("./api");
mongoose.connect(secrete_1.Url.url, { useNewUrlParser: true })
    .then(function () {
    console.log('mongoose connection success: !!!!!');
}, function (err) { console.log('mongoose connection error: ', err); });
var app = express();
var PORT = 3000;
global_middleware_1.setGlobalMiddleware(app);
app.use('/api', api_1.restRouter);
var httpServer = app.listen(PORT, function () {
    console.log('HTTP SERVER Running port 3000 ......');
});
