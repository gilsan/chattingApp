"use strict";
exports.__esModule = true;
var Status = require("http-status-codes");
var conversationModels_1 = require("../models/conversationModels");
exports["default"] = {
    SendMessage: function (req, res) {
        try {
            var sender_Id = req.param('senderId');
            var receiver_Id = req.param('receiverId');
            console.log(req.param);
            console.log(sender_Id, receiver_Id);
            conversationModels_1["default"].find({
                $or: [
                    { participants: { $elementMatch: { senderId: sender_Id, receiverId: receiver_Id } } },
                    { participants: { $elementMatch: { senderId: receiver_Id, receiverId: sender_Id } } }
                ]
            }).then(function (result) {
                console.log('있음');
            })["catch"](function (err) {
                console.log('없음');
            });
        }
        catch (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
        }
    }
};
