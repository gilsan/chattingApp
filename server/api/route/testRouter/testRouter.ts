import * as express from 'express';
import postController from '../../controllers/testPost';

export  const testRouter = express.Router();
testRouter.post('/add-post',  postController.AddPost);
