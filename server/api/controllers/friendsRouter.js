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
exports["default"] = {
    FollowUser: function (req, res) {
        var _this = this;
        //  console.log(req.body);
        var followUser = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModels_1["default"].update({ _id: req.user._id,
                            'following.userFollowed': { $ne: req.body.userFollowed } }, {
                            $push: {
                                following: {
                                    userFollowed: req.body.userFollowed
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userModels_1["default"].update({ _id: req.body.userFollowed,
                                'followers.follower': { $ne: req.user._id } }, {
                                $push: {
                                    followers: {
                                        follower: req.user._id
                                    }
                                },
                                notifications: {
                                    senderId: req.user._id,
                                    message: req.user.username + "\uB2D8\uC740 \uB2F9\uC2E0\uC758 \uD314\uB85C\uC6B0 \uC785\uB2C8\uB2E4.",
                                    created: new Date(),
                                    viewProfile: false
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        followUser()
            .then(function () {
            res.status(Status.OK).json({ msg: 'following user' });
        })["catch"](function (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: 'following user err' });
        });
    },
    UnFollowUser: function (req, res) {
        var _this = this;
        var unfollowUser = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModels_1["default"].update({ _id: req.user._id }, {
                            $pull: {
                                following: {
                                    userFollowed: req.body.userFollowed
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userModels_1["default"].update({ _id: req.body.userFollowed }, {
                                $pull: {
                                    followers: {
                                        follower: req.user._id
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        unfollowUser()
            .then(function () {
            res.status(Status.OK).json({ msg: 'unfollowing user' });
        })["catch"](function (err) {
            res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: 'unfollowing user err' });
        });
    },
    MarkNotification: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!req.body.deleteValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, userModels_1["default"].updateOne({
                                _id: req.user._id,
                                'notifications._id': req.params.id
                            }, {
                                $set: { 'notifications.$.read': true }
                            }).then(function () {
                                res.status(Status.OK).json({ msg: '읽음 표시....' });
                            })["catch"](function (err) {
                                res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: 'Eorror occured' });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        console.log('friendsRoute: 마크삭제 ', req.params.id, req.user._id);
                        return [4 /*yield*/, userModels_1["default"].update({
                                _id: req.user._id,
                                'notifications._id': req.params.id
                            }, {
                                $pull: {
                                    notifications: { _id: req.parmas.id }
                                }
                            })
                                .then(function () {
                                res.status(Status.OK).json({ msg: '마크삭제 표시....' });
                            })["catch"](function (err) {
                                res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '마크삭제 에러 발생', err: err });
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    MarkAllNotifications: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModels_1["default"].update({
                            _id: req.user._id
                        }, { $set: { 'notifications.$[elem].read': true } }, { arrayFilters: [{ 'elem.read': false }], multi: true })
                            .then(function () {
                            res.status(Status.OK).json({ message: 'Marked all successfully' });
                        })["catch"](function (err) {
                            res
                                .status(Status.INTERNAL_SERVER_ERROR)
                                .json({ message: '전체 마크삭제 에러 발생', err: err });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
