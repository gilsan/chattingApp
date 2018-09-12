"use strict";
exports.__esModule = true;
exports["default"] = {
    AddPost: function (req, res) {
        console.log(req);
        res.status(200).json({ msg: req.body, type: '내용물' });
    }
};
