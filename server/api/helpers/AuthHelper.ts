import * as jwt from 'jsonwebtoken';
import { Url } from '../config/secrete';
import * as Status from 'http-status-codes';

export default {

   async   VerifyToken (req, res, next) {
     if (!req.headers.authorization) {
        return res
          .status(Status.UNAUTHORIZED)
          .json({msg: '권한 없음'});
     }
     const token = req.cookies.auth || req.headers.authorization.split(' ')[1];

     if (!token) {
       return res.status(Status.FORBIDDEN).json({msg: '토큰이 없습니다.'});
     }

    const key = Url.secret;
    return jwt.verify(token, key, (err, decoded) => {
       if (err) {
         console.log('사용 만료: ', err);
         if (err.expiredAt < new Date() ) {
           return res.status(Status.INTERNAL_SERVER_ERROR).json({
             msg: '토큰이 사용 만료 되었습니다.',
             token: null
           });
         }
         next();
       }

       req.user = decoded.data;
       next();
    });

  },

};


