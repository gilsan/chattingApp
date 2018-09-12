"use strict";
exports.__esModule = true;
exports["default"] = {
    connect: function (io) {
        io.on('refresh', function () {
            io.emit('refreshPage', { data: 'socket emit....' });
        });
    }
};
