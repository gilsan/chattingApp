

export  default {
    connect(io) {
      io.on('refresh', () => {
        io.emit('refreshPage', {data: 'socket emit....'});
     } );
    }
};

