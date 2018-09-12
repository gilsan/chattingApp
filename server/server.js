"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var global_middleware_1 = require("./api/middlewares/global-middleware");
var secrete_1 = require("./api/config/secrete");
var http = require("http");
var api_1 = require("./api");
// import conn from './api/socket/streams';
mongoose.connect(secrete_1.Url.url, { useNewUrlParser: true })
    .then(function () {
    console.log('mongoose connection success: !!!!!');
}, function (err) { console.log('mongoose connection error: ', err); });
var app = express();
var PORT = 3000;
// socket io
var server = http.createServer(app);
var io = require('socket.io').listen(server);
//
io.on('connection', function (socket) {
    socket.on('refresh', function (data) {
        console.log(data);
        io.emit('refreshPage', { data: 'io emit ....' });
    });
});
// Global middleware
global_middleware_1.setGlobalMiddleware(app);
app.use('/api', api_1.restRouter);
var httpServer = server.listen(PORT, function () {
    console.log('HTTP SERVER Running port 3000 ......');
});
