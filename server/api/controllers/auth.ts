import userService from './authService';
import User from '../models/userModels';
import * as Status from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Url } from '../config/secrete';

export default {

 async  register(req, res) {
    try {

     const { error, value } =   userService.validateSignupSchema(req.body);
     if ( error && error.details ) {
       return res.status(Status.BAD_REQUEST).json({msg: error.details });
     }
     // 디비에 등록되어 있는지 확인
     const userEmail = await  User.findOne({email: value.email});
      if (userEmail) {
        return res.status(Status.CONFLICT).json({msg: '중복된 사용자 입니다.'});
      }
      // 디비에 저장
        const salt = await bcrypt.genSalt();
        const hash = await  bcrypt.hash(value.password, salt);
        const body = {
          username: value.username,
          email : value.email,
          password: hash
      };
         User.create(body)
         .then((user) => {

           const token = jwt.sign({data: user}, Url.secret, {
              expiresIn: '1d'
           });
           res.cookie('auth', token);
          return res.status(Status.CREATED).json({msg: user, token: token});
         }).catch(err => {
            return res.status(Status.INTERNAL_SERVER_ERROR).json({msg: err});
         });
    } catch ( err) {
        return res.status(Status.INTERNAL_SERVER_ERROR).json({msg:  err });
    }

  },

async  login(req, res) {
    try {
      const { error, value } =   userService.validateLoginSchema(req.body);
      if ( error && error.details ) {
        return res.status(Status.BAD_REQUEST).json({msg: error.details });
      }
      // 디비에 등록되어 있는지 확인
      const user = await  User.findOne({email: value.email});
       if (!user) {
         return res.status(Status.UNAUTHORIZED).json({msg: '이메일주소 또는 암호가 틀립니다.'});
       }

       const matched = bcrypt.compare(value.password, user.password);
       if (!matched) {
          return res.status(Status.UNAUTHORIZED).json({msg: '이메일주소 또는 암호가 틀립니다.' });
       }
       const token = jwt.sign({data: user}, Url.secret, {
        expiresIn: '1d'
     });
        res.cookie('auth', token);
       return res.status(Status.OK).json({msg: user, token: token});

     } catch ( err) {
         return res.status(Status.INTERNAL_SERVER_ERROR).json({msg:  err });
     }
  }
};
