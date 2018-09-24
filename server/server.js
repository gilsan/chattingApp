"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var _ = require("lodash");
var global_middleware_1 = require("./api/middlewares/global-middleware");
var secrete_1 = require("./api/config/secrete");
var http = require("http");
var api_1 = require("./api");
var userClass_1 = require("./api/helpers/userClass");
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
var userData = new userClass_1.User();
io.on('connection', function (socket) {
    socket.on('refresh', function (data) {
        io.emit('refreshPage', { data: 'io emit ....' });
    });
    socket.on('join chat', function (params) {
        //   console.log(params);
        socket.join(params.room1);
        socket.join(params.room2);
    });
    socket.on('start_typing', function (data) {
        io.to(data.receiver).emit('is_typing', data);
    });
    socket.on('stop_typing', function (data) {
        io.to(data.receiver).emit('has_stopped_typing', data);
    });
    socket.on('online', function (data) {
        console.log('online: ', data);
        socket.join(data.room);
        userData.EnterRoom(socket.id, data.user, data.room);
        var list = userData.GetList(data.room);
        io.emit('usersOnline', _.uniq(list));
    });
    socket.on('disconnect', function () {
        var user = userData.RemoveUser(socket.id);
        if (user) {
            var userArray = userData.GetList(user.room);
            var arr = _.uniq(userArray);
            _.remove(arr, function (n) { return n === user.name; });
            io.emit('usersOnline', arr);
        }
    });
});
// Global middleware
global_middleware_1.setGlobalMiddleware(app);
app.use('/api', api_1.restRouter);
var httpServer = server.listen(PORT, function () {
    console.log('HTTP SERVER Running port 3000 ......');
});
