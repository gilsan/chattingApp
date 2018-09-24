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
var userModels_1 = require("../models/userModels");
var Joi = require("joi");
var bcrypt = require("bcryptjs");
exports["default"] = {
    GetAllUsers: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModels_1["default"].find({})
                                .populate('posts.postId')
                                .populate('following.userFollowed')
                                .populate('followers.follower')
                                .populate('chatList.receiverId')
                                .populate('chatList.msgId')
                                .populate('notifications.senderid')
                                .then(function (result) {
                                res.status(Status.OK).json({ msg: '사용자 내역', result: result });
                            })["catch"](function (err) {
                                res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    GetUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModels_1["default"].findOne({ _id: req.params.id })
                                .populate('posts.postId')
                                .populate('following.userFollowed')
                                .populate('followers.follower')
                                .populate('chatList.receiverId')
                                .populate('chatList.msgId')
                                .populate('notifications.senderid')
                                .then(function (user) {
                                res.status(Status.OK).json({ msg: '아이디로 사용자 정보 찿기', user: user });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    GetUserByName: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModels_1["default"].findOne({ username: req.params.username })
                                .populate('post.postId')
                                .populate('following.userFollowed')
                                .populate('followers.follower')
                                .populate('chatList.receiverId')
                                .populate('chatList.msgId')
                                .populate('notifications.senderid')
                                .then(function (user) {
                                res.status(Status.OK).json({ msg: '이름으로 사용자 정보 찿기', user: user });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러', err: err_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    ChangePassword: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var schema, _a, error, value, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = Joi.object().keys({
                            cPassword: Joi.string().required(),
                            newPassword: Joi.string().required(),
                            confirmPassword: Joi.string().optional()
                        });
                        _a = Joi.validate(req.body.body, schema), error = _a.error, value = _a.value;
                        if (error && error.details) {
                            res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: error.details });
                        }
                        return [4 /*yield*/, userModels_1["default"].findOne({ _id: req.user._id })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, bcrypt.compare(value.cPassword, user.password)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var newpassword;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!result) {
                                                return [2 /*return*/, res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '현재번호가 맞지 않습니다.' })];
                                            }
                                            return [4 /*yield*/, bcrypt.hash(req.body.body.newPassword, 10)];
                                        case 1:
                                            newpassword = _a.sent();
                                            return [4 /*yield*/, user.update({
                                                    _id: req.user._id
                                                }, {
                                                    password: newpassword
                                                }).then(function () {
                                                    res.status(Status.OK).json({ msg: '번호 변경 ', result: result });
                                                })["catch"](function (err) {
                                                    res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '변경 변경에러' });
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        });
    }
};
