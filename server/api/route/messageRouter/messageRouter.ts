import * as express from 'express';
import messageCtrl from '../../controllers/message';
import AuthHelper from '../../helpers/AuthHelper';

export  const messageRouter = express.Router();
messageRouter.post('/chat-message/:senderId/:receiverId', AuthHelper.VerifyToken, messageCtrl.SendMessage);
messageRouter.get('/chat-message/:senderId/:receiverId', AuthHelper.VerifyToken, messageCtrl.GetAllMessage);
messageRouter.get('/receiver-message/:sender/:receiver', AuthHelper.VerifyToken, messageCtrl.MarkReceiverMessage);
messageRouter.get('/mark-all-messages', AuthHelper.VerifyToken, messageCtrl.MarkAllMessages);
