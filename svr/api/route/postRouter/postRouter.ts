import * as express from 'express';
import postController from '../../controllers/addPost';

export  const postRouter = express.Router();
postRouter.post('/add-post',  postController.AddPost);
