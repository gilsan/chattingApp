import * as Status from 'http-status-codes';
import Message from '../models/messageModels';
import Conversation from '../models/conversationModels';
import User from '../models/userModels';


export default {

  SendMessage(req, res) {
     try {

       const sender_Id = req.param('senderId');
       const receiver_Id = req.param('receiverId');
       Conversation.find({
          $or: [
                { participants: { $elementMatch: { senderId: sender_Id, receiverId: receiver_Id} } },
                { participants: { $elementMatch: { senderId: receiver_Id, receiverId: sender_Id} } }
             ]
       }).then( (result) => {
          console.log('있음');
       })
       .catch( (err) => {
          console.log('없음');
       });



     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

};
