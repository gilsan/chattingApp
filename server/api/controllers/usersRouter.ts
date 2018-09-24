import * as Status from 'http-status-codes';
import User from '../models/userModels';
import * as Joi from 'joi';
import * as bcrypt from 'bcryptjs';

export default {
   async  GetAllUsers(req, res) {
    try {
        await  User.find({})
          .populate('posts.postId')
          .populate('following.userFollowed')
          .populate('followers.follower')
          .populate('chatList.receiverId')
          .populate('chatList.msgId')
          .populate('notifications.senderid')
          .then((result) => {
            res.status(Status.OK).json({msg: '사용자 내역', result});
          }).catch(err => {
            res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
          });
    } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
    }
  },

  async GetUser(req, res) {
   // console.log('GetUser:  ', req.params.id);
     try {
      await User.findOne({_id: req.params.id})
      .populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .populate('notifications.senderid')
      .then( (user) => {
       res.status(Status.OK).json({msg: '아이디로 사용자 정보 찿기' , user });
      });
     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

  async GetUserByName(req, res) {
   // console.log(req.params);
    try {
      await User.findOne({ username : req.params.username})
      .populate('post.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .populate('notifications.senderid')
      .then( (user) => {
       res.status(Status.OK).json({msg: '이름으로 사용자 정보 찿기' , user });
      });
    } catch (err) {
     res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러', err});
    }
  },

 async ChangePassword(req, res) {

   const schema = Joi.object().keys({
    cPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().optional()
  });

  const { error, value } = Joi.validate(req.body.body, schema);
   if (error  && error.details) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({msg: error.details});
   }

   const user = await User.findOne({ _id: req.user._id});

   return  bcrypt.compare(value.cPassword, user.password)
          .then(  async (result) => {
                if (!result) {
                   return res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '현재번호가 맞지 않습니다.'});
                }
                 const newpassword = await bcrypt.hash(req.body.body.newPassword, 10);
                 await user.update({
                   _id: req.user._id
                 }, {
                   password: newpassword
                 }).then(() => {
                   res.status(Status.OK).json({msg: '번호 변경 ', result});
                 }).catch(err => {
                   res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '변경 변경에러'});
                 });
          });



  }

};
