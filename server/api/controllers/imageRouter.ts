  /************
   * cloudinary.com 에 저장
   */

import * as cloudinary from 'cloudinary';
import * as Status from 'http-status-codes';
import User from '../models/userModels';
import * as moment from 'moment';

cloudinary.config({
  cloud_name: 'dxuimtvfm',
  api_key: '473843396736467',
  api_secret: 'jYqQINTuvKqDgfEEEbZuzeseYuE'
});

export default {

  UploadImage(req, res) {
    cloudinary.uploader.upload(req.body.image, async (result) => {
           console.log(result);

           await User.update(
             {
               _id: req.user._id
             },
             {
               $push: {
                  images: {
                     imgId: result.public_id,
                     imgVersion: result.version
                  }
               }
             }
           ).then( (data) => {
            res.status(Status.OK).json({msg: '이미지 올리기를 하였습니다...', data});
           })
           .catch(
             (err) =>  res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'file upload err'})
           );
    });

  },

 async DefaultImage(req, res) {
    const imgId = req.params.imgId;
    const imgVersion = req.params.imgVersion;

    console.log(imgId, imgVersion);
    await User.update(
      {
        _id: req.user._id
      },
      {
        picId: imgId,
        picVersion: imgVersion
      }
    ).then( (data) => {
     res.status(Status.OK).json({msg: '기본 이미지 변경을 하였습니다...', data});
    })
    .catch(
      (err) =>  res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'set defaul image err'})
    );
  },

  async ProfileView(req, res) {
     const dataValue = moment().format('YYYY-MM-DD');
     await User.update(
          {
            _id: req.body.id,
            'notifcations.data': { $ne: dataValue }
          },
          {
             $push: {
                 notificatons: {
                     senderId: req.user._id,
                     message: `${req.user.username} viewed your profile`,
                     created: new Date(),
                     date: dataValue,
                     viewProfile: true
                 }
             }
          }
     ).then((data) => {
      res.status(Status.OK).json({msg: '살표보기 알림 설정을 하였습니다...', data});
     })
     .catch(
      (err) =>  res.status(Status.INTERNAL_SERVER_ERROR).json({msg: 'set defaul image err'})
     );
  }



};
