import * as express from 'express';
import * as mongoose from 'mongoose';
import { Application } from 'express';

import { setGlobalMiddleware } from './api/middlewares/global-middleware';
import { Url } from './api/config/secrete';
import * as http from 'http';
import { restRouter } from './api';
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
  io.on('connection', (socket) => {
     socket.on('refresh', (data) => {
       console.log(data);
       io.emit('refreshPage', { data: 'io emit ....'});
     });
  });


 // Global middleware
setGlobalMiddleware(app);
app.use('/api', restRouter);

const httpServer = server.listen(PORT, () => {
  console.log('HTTP SERVER Running port 3000 ......');
});

