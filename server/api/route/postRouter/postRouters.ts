import * as express from 'express';
import postController from '../../controllers/addPost';
import AuthHelper from '../../helpers/AuthHelper';

export  const postRouter = express.Router();
postRouter.get('/posts', AuthHelper.VerifyToken, postController.GetAllPosts);
postRouter.get('/post/:id', AuthHelper.VerifyToken, postController.GetPost);

postRouter.post('/add-post', AuthHelper.VerifyToken, postController.AddPost);
postRouter.post('/add-like', AuthHelper.VerifyToken, postController.AddLike);
postRouter.post('/add-comment', AuthHelper.VerifyToken, postController.AddComment);
postRouter.put('/post-edit', AuthHelper.VerifyToken, postController.PostEdit);
postRouter.delete('/post-delete/:id', AuthHelper.VerifyToken, postController.PostDelete);
