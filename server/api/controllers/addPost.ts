import * as Joi from 'joi';
import Post from '../models/postModels';
import User from '../models/userModels';

import * as Status from 'http-status-codes';

export default {
  AddPost(req, res) {

    const schema = Joi.object().keys({
      post: Joi.string().required(),
    });

    const{ error } = Joi.validate(req.body, schema);
    if (error && error.details ) {
      return res.status(Status.BAD_REQUEST).json({msg: error.details});
    }

    const body = {
      user: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date()
    };

    Post.create(body).then( async (post) => {
      await User.update(
        {
          _id: req.user._id
        }, {
          $push: {
            posts: {
              postId: post._id,
              post: req.body.post,
              created: new Date()
            }
          }
        }
      );
      res.status(200).json({msg: post});
    }).catch( err => {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
    });
  },

  async GetAllPosts(req, res) {
     try {
      const posts = await Post.find({})
         .populate('user')
         .sort({created: -1});

         const top = await Post.find({totalLikes: {$gte: 2}})
         .populate('user')
         .sort({created: -1});

      res.status(Status.OK).json({msg: 'GetAllPosts 전체' , posts, top});
     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

  async AddLike(req, res) {
     try {

     const postId = req.body._id;
     await Post.update(
       {  _id: postId,
         'likes.username': { $ne: req.user.username }
       },
       { $push: { likes: { username: req.user.username }}, $inc: { totalLikes: 1 }}
      ).then( () => {
        res.status(Status.OK).json({msg: '좋아요 추가....'});
      });

     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
     }
  },

  async AddComment(req, res) {
    try {

       const postId = req.body.postId;
       await Post.updateOne( {
          _id: postId
       }, {
         $push: {
           comments: {
             userId: req.user._id,
             username: req.user.username,
             comment: req.body.comment,
             createdAt: new Date()
           }
         }
       })
       .then( () => {
        res.status(Status.OK).json({msg: '멘트 추가....'});
       });

    } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
    }
  },

 async GetPost(req, res) {
   /*********
    * populate 는 연관된 문서도 같이 제공한다.
    */
   try {
    await Post.findOne({_id: req.params.id})
    .populate('user')
    .populate('comments.userId')
    .then( (post) => {
     res.status(Status.OK).json({msg: '코멘트' , post});
    });
   } catch (err) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
   }

  },

   PostAdd(req, res) {
     console.log(req.body);
  }
};

