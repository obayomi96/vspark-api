import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';

const {
  userLogin,
  fetchOwnProfile,
  updateProfile,
  fetchProfile,
  confirmEmail,
  resetPassword,
  // socialSignin
} = UserController;

const {
  verifyToken,
  isAdmin
} = middlewares;

const userRoute = express();

userRoute.post('/login', userLogin);
userRoute.get('/:user_id', verifyToken, fetchOwnProfile);
// userRoute.get('/', verifyToken, fetchUsers);
userRoute.patch('/:user_id', verifyToken, updateProfile);
userRoute.get('/admin/:user_id', verifyToken, isAdmin, fetchProfile);
userRoute.get('/confirm-email', verifyToken, confirmEmail);
userRoute.patch('/password-reset/:user_id', verifyToken, resetPassword);
// userRoute.get('/google', passport.authenticate('google', {
//   scope:
//   ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
// }));
// userRoute.get('/google/callback', passport.authenticate('google', { session: false }), socialSignin);

// userRoute.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// userRoute.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialSignin);

export default userRoute;

