"use strict";
exports.__esModule = true;
var User = (function () {
    function User() {
        this.globalArray = [];
    }
    User.prototype.EnterRoom = function (id, name, room) {
        var user = { id: id, name: name, room: room };
        this.globalArray.push(user);
        return user;
    };
    User.prototype.GetUserId = function (id) {
        var socketId = this.globalArray.filter(function (userId) { return userId.id === id; })[0];
        return socketId;
    };
    User.prototype.RemoveUser = function (id) {
        var user = this.GetUserId(id);
        if (user) {
            this.globalArray = this.globalArray.filter(function (userId) { return userId.id !== id; });
        }
        return user;
    };
    User.prototype.GetList = function (room) {
        var roomName = this.globalArray.filter(function (user) { return user.room === room; });
        var names = roomName.map(function (user) { return user.name; });
        return names;
    };
    return User;
}());
exports.User = User;
