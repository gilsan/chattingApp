import * as express from 'express';
import { postRouter } from './route/postRouter';
export const restRouter = express.Router();

restRouter.use('/post', postRouter);
