"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Status = require("http-status-codes");
var messageModels_1 = require("../models/messageModels");
var conversationModels_1 = require("../models/conversationModels");
var userModels_1 = require("../models/userModels");
exports["default"] = {
    MarkAllMessages: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, messageModels_1["default"].aggregate([
                            { $match: { 'message.receivername': req.user.username } },
                            { $unwind: '$message' },
                            { $match: { 'message.receivername': req.user.username } }
                        ])];
                    case 1:
                        msg = _a.sent();
                        if (msg.length > 0) {
                            try {
                                msg.forEach(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, messageModels_1["default"].update({
                                                    'message._id': value.message._id
                                                }, {
                                                    $set: { 'message.$.isRead': true }
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                res.status(Status.OK).json({ message: '전체 읽기 변경 수행했음' });
                            }
                            catch (err) {
                                res.status(Status.INTERNAL_SERVER_ERROR).json({ message: '전체 읽기 변경  실패' });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    MarkReceiverMessage: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var sender, receiver, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = req.params.sender;
                        receiver = req.params.receiver;
                        return [4 /*yield*/, messageModels_1["default"].aggregate([
                                { $unwind: '$message' },
                                {
                                    $match: {
                                        $and: [
                                            { 'message.sendername': receiver, 'message.receivername': sender }
                                        ]
                                    }
                                }
                            ])];
                    case 1:
                        msg = _a.sent();
                        if (msg.length > 0) {
                            try {
                                msg.forEach(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, messageModels_1["default"].update({
                                                    'message._id': value.message._id
                                                }, {
                                                    $set: { 'message.$.isRead': true }
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                res.status(Status.OK).json({ message: '읽기 변경 수행했음' });
                            }
                            catch (err) {
                                res.status(Status.INTERNAL_SERVER_ERROR).json({ message: '읽기 변경  실패' });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    SendMessage: function (req, res) {
        var _this = this;
        try {
            var sender_Id = req.params.senderId;
            var receiver_Id_1 = req.params.receiverId;
            conversationModels_1["default"].find({
                $or: [
                    { participants: { $elemMatch: { senderId: sender_Id, receiverId: receiver_Id_1 } } },
                    { participants: { $elemMatch: { senderId: receiver_Id_1, receiverId: sender_Id } } }
                ]
            }).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                var newConversation, saveConversation, newMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(result.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, messageModels_1["default"].update({
                                    conversationId: result[0]._id
                                }, {
                                    $push: {
                                        message: {
                                            senderId: req.user._id,
                                            receiverId: receiver_Id_1,
                                            sendername: req.user.username,
                                            receivername: req.body.receiverName,
                                            body: req.body.message
                                        }
                                    }
                                }).then(function (item) {
                                    res.status(Status.OK).json({ msg: '추가 내역 ....', item: item });
                                })["catch"](function (err) {
                                    res.status(Status.OK).json({ msg: '추가 실패 ....', err: err });
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 2:
                            newConversation = new conversationModels_1["default"]();
                            newConversation.participants.push({
                                senderId: req.user._id,
                                receiverId: receiver_Id_1
                            });
                            return [4 /*yield*/, newConversation.save()];
                        case 3:
                            saveConversation = _a.sent();
                            newMessage = new messageModels_1["default"]();
                            newMessage.conversationId = saveConversation._id;
                            newMessage.sender = req.body.username;
                            newMessage.receiver = req.body.receiverName;
                            newMessage.message.push({
                                senderId: req.user._id,
                                receiverId: receiver_Id_1,
                                sendername: req.user.username,
                                receivername: req.body.receiverName,
                                body: req.body.message
                            });
                            return [4 /*yield*/, userModels_1["default"].update({
                                    _id: req.user._id
                                }, {
                                    $push: {
                                        chatList: {
                                            $each: [
                                                {
                                                    receiverId: receiver_Id_1,
                                                    msgId: newMessage._id
                                                }
                                            ],
                                            $position: 0
                                        }
                                    }
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, userModels_1["default"].update({
                                    _id: receiver_Id_1
                                }, {
                                    $push: {
                                        chatList: {
                                            $each: [
                                                {
                                                    receiverId: req.user._id,
                                                    msgId: newMessage._id
                                                }
                                            ],
                                            $position: 0
                                        }
                                    }
                                })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, newMessage
                                    .save()
                                    .then(function (item) {
                                    res.status(Status.OK).json({ msg: '입력 내역 ....', item: item });
                                })["catch"](function (err) {
                                    res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '입력 에러 ....' });
                                })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) {
                console.log('없음');
            });
        }
        catch (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
        }
    },
    GetAllMessage: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sender_Id, receiver_Id, conversation, messages, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sender_Id = req.params.senderId;
                        receiver_Id = req.params.receiverId;
                        return [4 /*yield*/, conversationModels_1["default"].findOne({
                                $or: [
                                    {
                                        $and: [
                                            { 'participants.senderId': sender_Id },
                                            { 'participants.receiverId': receiver_Id }
                                        ]
                                    },
                                    {
                                        $and: [
                                            { 'participants.senderId': receiver_Id },
                                            { 'participants.receiverId': sender_Id }
                                        ]
                                    }
                                ]
                            }).select('_id')];
                    case 1:
                        conversation = _a.sent();
                        if (!conversation) return [3 /*break*/, 3];
                        return [4 /*yield*/, messageModels_1["default"].findOne({
                                conversationId: conversation._id
                            })];
                    case 2:
                        messages = _a.sent();
                        res.status(Status.OK).json({ msg: '메세지 리스트', messages: messages });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
