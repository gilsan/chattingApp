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
var authService_1 = require("./authService");
var userModels_1 = require("../models/userModels");
var Status = require("http-status-codes");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var secrete_1 = require("../config/secrete");
exports["default"] = {
    register: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, value, userEmail, salt, hash, body, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = authService_1["default"].validateSignupSchema(req.body), error = _a.error, value = _a.value;
                        if (error && error.details) {
                            return [2 /*return*/, res.status(Status.BAD_REQUEST).json({ msg: error.details })];
                        }
                        return [4 /*yield*/, userModels_1["default"].findOne({ email: value.email })];
                    case 1:
                        userEmail = _b.sent();
                        if (userEmail) {
                            return [2 /*return*/, res.status(Status.CONFLICT).json({ msg: '중복된 사용자 입니다.' })];
                        }
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt.hash(value.password, salt)];
                    case 3:
                        hash = _b.sent();
                        body = {
                            username: value.username,
                            email: value.email,
                            password: hash
                        };
                        userModels_1["default"].create(body)
                            .then(function (user) {
                            var token = jwt.sign({ data: user }, secrete_1.Url.secret, {
                                expiresIn: '1d'
                            });
                            res.cookie('auth', token);
                            return res.status(Status.CREATED).json({ msg: user, token: token });
                        })["catch"](function (err) {
                            return res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: err });
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: err_1 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, value, user, matched, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = authService_1["default"].validateLoginSchema(req.body), error = _a.error, value = _a.value;
                        if (error && error.details) {
                            return [2 /*return*/, res.status(Status.BAD_REQUEST).json({ msg: error.details })];
                        }
                        return [4 /*yield*/, userModels_1["default"].findOne({ email: value.email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(Status.UNAUTHORIZED).json({ msg: '이메일주소 또는 암호가 틀립니다.' })];
                        }
                        matched = bcrypt.compare(value.password, user.password);
                        if (!matched) {
                            return [2 /*return*/, res.status(Status.UNAUTHORIZED).json({ msg: '이메일주소 또는 암호가 틀립니다.' })];
                        }
                        token = jwt.sign({ data: user }, secrete_1.Url.secret, {
                            expiresIn: '1d'
                        });
                        res.cookie('auth', token);
                        return [2 /*return*/, res.status(Status.OK).json({ msg: user, token: token })];
                    case 2:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: err_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
