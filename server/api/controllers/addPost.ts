import * as Joi from 'joi';
import Post from '../models/postModels';
import User from '../models/userModels';
import * as cloudinary from 'cloudinary';
import * as Status from 'http-status-codes';
import * as moment from 'moment';

cloudinary.config({
  cloud_name: 'dxuimtvfm',
  api_key: '473843396736467',
  api_secret: 'jYqQINTuvKqDgfEEEbZuzeseYuE'
});

export default {
  AddPost(req, res) {

    const schema = Joi.object().keys({
      post: Joi.string().required(),
    });


    const post_body = {
      post: req.body.post
    };

    const{ error } = Joi.validate(post_body, schema);
    if (error && error.details ) {
      return res.status(Status.BAD_REQUEST).json({msg: error.details});
    }

    const body = {
      user: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date()
    };



   if (req.body.post && !req.body.image) {
    // console.log('req.body.post && !req.body.image ');
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
      res.status(200).json({msg: post, sender: '그림 없는 경우'});
    }).catch( err => {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'});
    });
  }

    if (req.body.post && req.body.image) {

      cloudinary.uploader.upload(req.body.image, async (result) => {
          //  console.log(result);
                 const reqBody = {
                   user: req.user._id,
                   username: req.user.username,
                   post: req.body.post,
                   imgId: result.public_id,
                   imgVersion: result.version,
                   created: new Date()

                 };

                  Post.create(reqBody)
                  .then( async (post) => {
                     await User.update(
                       {
                          _id: req.user._id
                       },
                       {
                          $push: {
                             posts: {
                                postId: post._id,
                                post: req.body.post,
                                created: new Date()
                             }
                          }
                       }
                     );
                     res.status(200).json({msg: post, posts: '사진있는 경우'});
                  })
                  .catch( (err) => res.status(Status.INTERNAL_SERVER_ERROR).json({msg: '서버 내부에러'}) );
       });
    }

  },

  async GetAllPosts(req, res) {
     try {

       const today = moment().startOf('day');
       const tomorrow = moment().add(1, 'days');

      const posts = await Post.find({})
         .populate('user')
         .sort({created: -1});
        // console.log('GetAllPosts: ', posts );
         const top = await Post.find({
           totalLikes: {$gte: 2},
         // created: { $gte: today.toDate(), $lt: tomorrow.toDate()}
         })
         .populate('user')
         .sort({created: -1});
         console.log('GetAllPosts: ',  top);
      res.status(Status.OK).json({msg: 'GetAllPosts 전체' , posts, top});
     } catch (err) {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'GetAllPosts 서버 내부에러' + err});
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
      console.log('PostEdit: ', req.body);
  },

  PostEdit(req, res) {
   const schema = Joi.object().keys({
       post: Joi.string().required(),
       id: Joi.string().optional()
   });

   const { error } = Joi.validate(req.body.bldy, schema);
   if (error && error.details ) {
     return res.status(Status.INTERNAL_SERVER_ERROR).json({msg: error.details });
   }

   const body = {
       post: req.body.body.post,
       created: new Date()
   };

   Post.findOneAndUpdate({_id: req.body.body.id}, body, { new: true})
     .then( post => {
      res.status(Status.OK).json({msg: '포트스 갱신 완료....' , post});
     })
     .catch( err => {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({msg: err  });
     });

  },

 async PostDelete(req, res) {
   try {
    const id = req.params.id;
    const result = await Post.findByIdAndRemove(id);
    console.log('PostDelet: ', result);
    if (!result) {
      return res.status(Status.NOT_FOUND).json({msg: '없는 아이템 입니다.'  });
    } else {
        await User.update({_id: req.user._id},
            { $pull : {
                posts: {
                  postId: result._id
                }
               }
           }
          );
          return res.status(Status.OK).json({msg: '포트스 삭제 완료....' });
    }


   } catch (err) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({msg: err  });
   }



  }
};

