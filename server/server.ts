import * as express from 'express';
import * as mongoose from 'mongoose';
import { Application } from 'express';
import * as _ from 'lodash';

import { setGlobalMiddleware } from './api/middlewares/global-middleware';
import { Url } from './api/config/secrete';
import * as http from 'http';
import { restRouter } from './api';
import { User } from './api/helpers/userClass';

// import conn from './api/socket/streams';


mongoose.connect(Url.url, { useNewUrlParser: true })
  .then(
    () => {
      console.log('mongoose connection success: !!!!!');
    },
    err => { console.log('mongoose connection error: ', err); }
  );

const app: Application = express();
const PORT = 3000;
// socket io
 const server = http.createServer(app);
 const io = require('socket.io').listen(server);
//
   const userData = new User();
  io.on('connection', (socket) => {
     socket.on('refresh', (data) => {
       io.emit('refreshPage', { data: 'io emit ....'});
     });

    socket.on('join chat', (params) => {
        //   console.log(params);
         socket.join(params.room1);
         socket.join(params.room2);
    });

    socket.on('start_typing', (data) => {
       io.to(data.receiver).emit('is_typing', data);
    });

    socket.on('stop_typing', (data) => {
         io.to(data.receiver).emit('has_stopped_typing', data);
      });

    socket.on('online', (data) => {
       console.log('online: ', data);

       socket.join(data.room);
       userData.EnterRoom(socket.id, data.user, data.room);
       const list = userData.GetList(data.room);
       io.emit('usersOnline', _.uniq(list));
    });

    socket.on('disconnect', () => {
         const user = userData.RemoveUser(socket.id);
         if (user) {
           const userArray = userData.GetList(user.room);
           const arr = _.uniq(userArray);
           _.remove(arr, n =>  n === user.name);
           io.emit('usersOnline', arr);

         }
    });

  });


 // Global middleware
setGlobalMiddleware(app);
app.use('/api', restRouter);

const httpServer = server.listen(PORT, () => {
  console.log('HTTP SERVER Running port 3000 ......');
});

