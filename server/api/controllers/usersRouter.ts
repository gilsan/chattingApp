import * as Status from 'http-status-codes';
import User from '../models/userModels';


export default {
   async  GetAllUsers(req, res) {
    try {
        await  User.find({})
          .populate('post.postId')
          .populate('following.userFollowed')
          .populate('followers.follower')
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
    console.log('GetUser:  ', req.params.id);
     try {
      await User.findOne({_id: req.params.id})
      .populate('post.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then( (user) => {
       res.status(Status.OK).json({msg: '아이디로 사용자 정보 찿기' , user });
      });
     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

  async GetUserByName(req, res) {
    console.log(req.params);
    try {
      await User.findOne({ username : req.params.username})
      .populate('post.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then( (user) => {
       res.status(Status.OK).json({msg: '이름으로 사용자 정보 찿기' , user });
      });
    } catch (err) {
     res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러', err});
    }
  }
};
