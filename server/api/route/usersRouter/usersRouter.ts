import * as express from 'express';
import usersController from '../../controllers/usersRouter';
import friendsController from '../../controllers/friendsRouter';
import AuthHelper from '../../helpers/AuthHelper';
import imageCtrl from '../../controllers/imageRouter';

export const usersRouter = express.Router();
usersRouter.get('/users', AuthHelper.VerifyToken, usersController.GetAllUsers);
usersRouter.get('/user/:id', AuthHelper.VerifyToken, usersController.GetUser);
usersRouter.get('/username/:username', AuthHelper.VerifyToken, usersController.GetUserByName);
usersRouter.post('/follow-user', AuthHelper.VerifyToken, friendsController.FollowUser);
usersRouter.post('/unfollow-user', AuthHelper.VerifyToken, friendsController.UnFollowUser);
usersRouter.post('/mark/:id', AuthHelper.VerifyToken, friendsController.MarkNotification);
usersRouter.post('/mark-all', AuthHelper.VerifyToken, friendsController.MarkAllNotifications);
usersRouter.post('/upload-image', AuthHelper.VerifyToken, imageCtrl.UploadImage);
usersRouter.get('/set-default-image/:imgId/:imgVersion', AuthHelper.VerifyToken, imageCtrl.DefaultImage);
usersRouter.post('/user/view-profile', AuthHelper.VerifyToken, imageCtrl.ProfileView);
usersRouter.post('/change-password', AuthHelper.VerifyToken, usersController.ChangePassword);
// usersRouter.post('/follower-user', AuthHelper.VerifyToken, friendsController.FollowerUser);

