import * as express from 'express';
import usersController from '../../controllers/usersRouter';
import friendsController from '../../controllers/friendsRouter';
import AuthHelper from '../../helpers/AuthHelper';

export const usersRouter = express.Router();
usersRouter.get('/users', AuthHelper.VerifyToken, usersController.GetAllUsers);
usersRouter.get('/user/:id', AuthHelper.VerifyToken, usersController.GetUser);
usersRouter.get('/username/:username', AuthHelper.VerifyToken, usersController.GetUserByName);
usersRouter.post('/follow-user', AuthHelper.VerifyToken, friendsController.FollowUser);
usersRouter.post('/unfollow-user', AuthHelper.VerifyToken, friendsController.UnFollowUser);
usersRouter.post('/mark/:id', AuthHelper.VerifyToken, friendsController.MarkNotification);
usersRouter.post('/mark-all', AuthHelper.VerifyToken, friendsController.MarkAllNotifications);

// usersRouter.post('/follower-user', AuthHelper.VerifyToken, friendsController.FollowerUser);

