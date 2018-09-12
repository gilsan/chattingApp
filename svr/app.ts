import * as express from 'express';
import * as mongoose from 'mongoose';
import { Application } from 'express';

import { setGlobalMiddleware } from './api/middlewares/global-middleware';
import { Url } from './api/config/secrete';
import { restRouter } from './api';


mongoose.connect(Url.url, { useNewUrlParser: true })
  .then(
    () => {
      console.log('mongoose connection success: !!!!!');
    },
    err => { console.log('mongoose connection error: ', err); }
  );

const app: Application = express();
const PORT = 3000;

setGlobalMiddleware(app);
app.use('/api', restRouter);

const httpServer = app.listen(PORT, () => {
  console.log('HTTP SERVER Running port 3000 ......');
});
