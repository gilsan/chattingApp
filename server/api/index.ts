import * as express from 'express';
import { authRouter } from './route/authRouter';
import { postRouter } from './route/postRouter';
import { usersRouter } from './route/usersRouter';
import { messageRouter} from './route/messageRouter';
import { testRouter } from './route/testRouter';
export const restRouter = express.Router();

restRouter.use('/auth', authRouter);
restRouter.use('/post', postRouter);
restRouter.use('/users', usersRouter);
restRouter.use('/message', messageRouter);
restRouter.use('/test', testRouter);
