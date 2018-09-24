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
var Joi = require("joi");
var postModels_1 = require("../models/postModels");
var userModels_1 = require("../models/userModels");
var cloudinary = require("cloudinary");
var Status = require("http-status-codes");
var moment = require("moment");
cloudinary.config({
    cloud_name: 'dxuimtvfm',
    api_key: '473843396736467',
    api_secret: 'jYqQINTuvKqDgfEEEbZuzeseYuE'
});
exports["default"] = {
    AddPost: function (req, res) {
        var _this = this;
        var schema = Joi.object().keys({
            post: Joi.string().required()
        });
        var post_body = {
            post: req.body.post
        };
        var error = Joi.validate(post_body, schema).error;
        if (error && error.details) {
            return res.status(Status.BAD_REQUEST).json({ msg: error.details });
        }
        var body = {
            user: req.user._id,
            username: req.user.username,
            post: req.body.post,
            created: new Date()
        };
        if (req.body.post && !req.body.image) {
            // console.log('req.body.post && !req.body.image ');
            postModels_1["default"].create(body).then(function (post) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, userModels_1["default"].update({
                                _id: req.user._id
                            }, {
                                $push: {
                                    posts: {
                                        postId: post._id,
                                        post: req.body.post,
                                        created: new Date()
                                    }
                                }
                            })];
                        case 1:
                            _a.sent();
                            res.status(200).json({ msg: post, sender: '그림 없는 경우' });
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) {
                res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
            });
        }
        if (req.body.post && req.body.image) {
            cloudinary.uploader.upload(req.body.image, function (result) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var reqBody;
                return __generator(this, function (_a) {
                    reqBody = {
                        user: req.user._id,
                        username: req.user.username,
                        post: req.body.post,
                        imgId: result.public_id,
                        imgVersion: result.version,
                        created: new Date()
                    };
                    postModels_1["default"].create(reqBody)
                        .then(function (post) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, userModels_1["default"].update({
                                        _id: req.user._id
                                    }, {
                                        $push: {
                                            posts: {
                                                postId: post._id,
                                                post: req.body.post,
                                                created: new Date()
                                            }
                                        }
                                    })];
                                case 1:
                                    _a.sent();
                                    res.status(200).json({ msg: post, posts: '사진있는 경우' });
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (err) { return res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' }); });
                    return [2 /*return*/];
                });
            }); });
        }
    },
    GetAllPosts: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var today, tomorrow, posts, top_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        today = moment().startOf('day');
                        tomorrow = moment().add(1, 'days');
                        return [4 /*yield*/, postModels_1["default"].find({})
                                .populate('user')
                                .sort({ created: -1 })];
                    case 1:
                        posts = _a.sent();
                        return [4 /*yield*/, postModels_1["default"].find({
                                totalLikes: { $gte: 2 }
                            })
                                .populate('user')
                                .sort({ created: -1 })];
                    case 2:
                        top_1 = _a.sent();
                        console.log('GetAllPosts: ', top_1);
                        res.status(Status.OK).json({ msg: 'GetAllPosts 전체', posts: posts, top: top_1 });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: 'GetAllPosts 서버 내부에러' + err_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    AddLike: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.body._id;
                        return [4 /*yield*/, postModels_1["default"].update({ _id: postId,
                                'likes.username': { $ne: req.user.username }
                            }, { $push: { likes: { username: req.user.username } }, $inc: { totalLikes: 1 } }).then(function () {
                                res.status(Status.OK).json({ msg: '좋아요 추가....' });
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
    AddComment: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.body.postId;
                        return [4 /*yield*/, postModels_1["default"].updateOne({
                                _id: postId
                            }, {
                                $push: {
                                    comments: {
                                        userId: req.user._id,
                                        username: req.user.username,
                                        comment: req.body.comment,
                                        createdAt: new Date()
                                    }
                                }
                            })
                                .then(function () {
                                res.status(Status.OK).json({ msg: '멘트 추가....' });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    GetPost: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, postModels_1["default"].findOne({ _id: req.params.id })
                                .populate('user')
                                .populate('comments.userId')
                                .then(function (post) {
                                res.status(Status.OK).json({ msg: '코멘트', post: post });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: '서버 내부에러' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    PostAdd: function (req, res) {
        console.log('PostEdit: ', req.body);
    },
    PostEdit: function (req, res) {
        var schema = Joi.object().keys({
            post: Joi.string().required(),
            id: Joi.string().optional()
        });
        var error = Joi.validate(req.body.bldy, schema).error;
        if (error && error.details) {
            return res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: error.details });
        }
        var body = {
            post: req.body.body.post,
            created: new Date()
        };
        postModels_1["default"].findOneAndUpdate({ _id: req.body.body.id }, body, { "new": true })
            .then(function (post) {
            res.status(Status.OK).json({ msg: '포트스 갱신 완료....', post: post });
        })["catch"](function (err) {
            return res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: err });
        });
    },
    PostDelete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = req.params.id;
                        return [4 /*yield*/, postModels_1["default"].findByIdAndRemove(id)];
                    case 1:
                        result = _a.sent();
                        console.log('PostDelet: ', result);
                        if (!!result) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(Status.NOT_FOUND).json({ msg: '없는 아이템 입니다.' })];
                    case 2: return [4 /*yield*/, userModels_1["default"].update({ _id: req.user._id }, { $pull: {
                                posts: {
                                    postId: result._id
                                }
                            }
                        })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(Status.OK).json({ msg: '포트스 삭제 완료....' })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: err_5 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
