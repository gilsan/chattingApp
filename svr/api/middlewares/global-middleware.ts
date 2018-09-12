import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as cors from 'cors';

const bodyParser = require('body-parser');

export const setGlobalMiddleware = app => {
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended : true}));
  app.use(cookieParser());
  app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-with, Control-Type, Accept', 'Authorization'
    );
    next();
  });
  app.use(logger('dev'));
};
