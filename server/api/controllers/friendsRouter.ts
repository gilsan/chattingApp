import * as Status from 'http-status-codes';
import User from '../models/userModels';

export default {
  FollowUser (req, res) {
  //  console.log(req.body);
    const followUser = async () => {

      await User.update(
        { _id: req.user._id,
         'following.userFollowed': { $ne: req.body.userFollowed }},
        {
           $push: {
             following: {
               userFollowed: req.body.userFollowed
             }
           }
        }
      );

      await User.update(
        { _id: req.body.userFollowed,
         'followers.follower': { $ne: req.user._id }},
        {
           $push: {
             followers: {
               follower: req.user._id
             }
           },
           notifications: {
             senderId: req.user._id,
             message: `${req.user.username}님은 당신의 팔로우 입니다.`,
             created: new Date(),
             viewProfile: false,
           }
        }
      );
    };



    followUser()
     .then( () => {
         res.status(Status.OK).json({msg: 'following user'});
     })
     .catch( err => {
        res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'following user err'});
     });
 },

  UnFollowUser (req, res) {
  const unfollowUser = async () => {

    await User.update(
      { _id: req.user._id },
      {
         $pull: {
           following: {
             userFollowed: req.body.userFollowed
           }
         }
      }
    );

    await User.update(
      { _id: req.body.userFollowed },
      {
         $pull: {
           followers: {
             follower: req.user._id
           }
         }
      }
    );
  };

  unfollowUser()
   .then( () => {
       res.status(Status.OK).json({msg: 'unfollowing user'});
   })
   .catch( err => {
      res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'unfollowing user err'});
   });

 },

async  MarkNotification(req, res ) {
//  console.log(req.body);

    if (!req.body.deleteValue) {
      await User.updateOne({
        _id: req.user._id,
        'notifications._id': req.params.id
      }, {
        $set: { 'notifications.$.read': true}
      }

     ).then( () => {
        res.status(Status.OK).json({msg: '읽음 표시....'});
      }).catch (err => {
          res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'Eorror occured'});
      });
    } else {
    //  console.log(req.params.id);
        await User.update({
          _id: req.user._id,
          'notifications._id': req.params.id
        }, {
           $pull: {
             notifications: { _id: req.parmas.id }
           }
        })
          .then(() => {
            res.status(Status.OK).json({msg: '삭제 표시....'});
          })
          .catch (err => {
            res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'Eorror occured'});
          });
    }

  },

  async MarkAllNotifications(req, res) {
    await User.update(
      {
        _id: req.user._id
      },
      { $set: { 'notifications.$[elem].read': true } },
      { arrayFilters: [{ 'elem.read': false }], multi: true }
    )
      .then(() => {
        res.status(Status.OK).json({ message: 'Marked all successfully' });
      })
      .catch(err => {
        res
          .status(Status.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured' });
      });
  }

};
