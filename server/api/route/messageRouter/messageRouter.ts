import * as express from 'express';
import messageCtrl from '../../controllers/message';
import AuthHelper from '../../helpers/AuthHelper';

export  const messageRouter = express.Router();
messageRouter.post('/chat-message/:senderId/:receiverId', AuthHelper.VerifyToken, messageCtrl.SendMessage);
