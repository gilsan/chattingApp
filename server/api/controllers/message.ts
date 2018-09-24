import * as Status from 'http-status-codes';
import Message from '../models/messageModels';
import Conversation from '../models/conversationModels';
import User from '../models/userModels';


export default {

 async MarkAllMessages(req, res) {

  // console.log('MarkAllMessages');

  const msg = await Message.aggregate([
         { $match: {'message.receivername': req.user.username}},
         { $unwind: '$message'},
         { $match: {'message.receivername': req.user.username}}
  ]);

  if (msg.length > 0) {
    try {
       msg.forEach( async (value) => {
           await Message.update(
             {
               'message._id': value.message._id
             },
             {
               $set: { 'message.$.isRead': true}
             }
           );
       });
       res.status(Status.OK).json({message: '전체 읽기 변경 수행했음'});
    } catch (err) {
       res.status(Status.INTERNAL_SERVER_ERROR).json({message: '전체 읽기 변경  실패'});
    }
  }
 },

 async MarkReceiverMessage(req, res) {

     const sender   = req.params.sender;
     const receiver = req.params.receiver;

     const msg = await Message.aggregate([
       {$unwind: '$message'},
       {
          $match: {
             $and: [
               { 'message.sendername': receiver, 'message.receivername': sender}
             ]
          }
       }
     ]);

     if (msg.length > 0) {
       try {
          msg.forEach( async (value) => {
              await Message.update(
                {
                  'message._id': value.message._id
                },
                {
                  $set: { 'message.$.isRead': true}
                }
              );
          });
          res.status(Status.OK).json({message: '읽기 변경 수행했음'});
       } catch (err) {
          res.status(Status.INTERNAL_SERVER_ERROR).json({message: '읽기 변경  실패'});
       }
     }

  },

    SendMessage(req, res) {
     try {

       const sender_Id = req.params.senderId;
       const receiver_Id = req.params.receiverId;

        Conversation.find({
          $or: [
                { participants: { $elemMatch: { senderId: sender_Id, receiverId: receiver_Id} } },
                { participants: { $elemMatch: { senderId: receiver_Id, receiverId: sender_Id} } }
             ]
       }).then( async (result) => {
          if (result.length > 0) {
                  await Message.update(
                    {
                      conversationId: result[0]._id
                    },
                    {
                      $push: {
                         message: {
                          senderId: req.user._id,
                          receiverId: receiver_Id,
                          sendername: req.user.username,
                          receivername: req.body.receiverName,
                          body: req.body.message
                         }
                      }
                    }
                  ).then ((item) => {
                    res.status(Status.OK).json({msg: '추가 내역 ....', item});
                  })
                  .catch( (err) => {
                    res.status(Status.OK).json({msg: '추가 실패 ....', err});
                  });
          } else {
             const newConversation = new Conversation();
             newConversation.participants.push({
                  senderId: req.user._id,
                  receiverId: receiver_Id
             });

             const saveConversation = await newConversation.save();

             const newMessage = new Message();
             newMessage.conversationId = saveConversation._id;
             newMessage.sender = req.body.username;
             newMessage.receiver = req.body.receiverName;
             newMessage.message.push({
               senderId: req.user._id,
               receiverId: receiver_Id,
               sendername: req.user.username,
               receivername: req.body.receiverName,
               body: req.body.message
             });

             await User.update(
              {
                _id: req.user._id
              },
              {
                    $push: {
                      chatList: {
                         $each: [
                            {
                               receiverId: receiver_Id,
                               msgId: newMessage._id
                            }
                          ],
                          $position: 0
                      }
                    }
              }
            );



             await User.update(
                {
                  _id: receiver_Id
                },
                {
                      $push: {
                        chatList: {
                           $each: [
                              {
                                 receiverId: req.user._id,
                                 msgId: newMessage._id
                              }
                            ],
                            $position: 0
                        }
                      }
                }
              );


            await newMessage
               .save()
               .then((item) => {
                res.status(Status.OK).json({msg: '입력 내역 ....', item});
               })
               .catch( err => {
                res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '입력 에러 ....'});
               });

          }
       })
       .catch( (err) => {
          console.log('없음');
       });



     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

  async GetAllMessage( req, res ) {
    try {
          const sender_Id = req.params.senderId;
          const receiver_Id = req.params.receiverId;

         const conversation = await Conversation.findOne({
            $or: [
              {
                $and: [
                  { 'participants.senderId': sender_Id},
                  { 'participants.receiverId': receiver_Id}
                ]
              },
              {
                $and: [
                  { 'participants.senderId': receiver_Id},
                  { 'participants.receiverId': sender_Id}
                ]
              }
            ]
         }).select('_id');

         if (conversation) {
           const messages = await Message.findOne({
              conversationId: conversation._id
           });
           res.status(Status.OK).json({msg: '메세지 리스트', messages});
         }

    } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
    }

  },

};
