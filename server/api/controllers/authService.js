"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports["default"] = {
    validateSignupSchema: function (body) {
        var schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            username: Joi.string().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    },
    validateLoginSchema: function (body) {
        var schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    }
};
