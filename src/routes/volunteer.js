import express from 'express';
import VolunteerController from '../controllers/VolunteerController';
import middlewares from '../middlewares';

const {
  volunteerLogin,
  volunteerSignup,
  updateProfile,
  fetchProfile,
  confirmEmail,
  resetPassword,
  // socialSignin
} = VolunteerController;

const {
  verifyToken,
  isAdmin
} = middlewares;

const volunteerRoute = express();

volunteerRoute.post('/register', volunteerSignup);
volunteerRoute.post('/login', volunteerLogin);
volunteerRoute.get('/:id', verifyToken, fetchProfile);
volunteerRoute.patch('/:id', verifyToken, updateProfile);
volunteerRoute.get('/confirm-email', verifyToken, confirmEmail);
volunteerRoute.patch('/password-reset/:id', verifyToken, resetPassword);
// volunteerRoute.get('/google', passport.authenticate('google', {
//   scope:
//   ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
// }));
// volunteerRoute.get('/google/callback', passport.authenticate('google', { session: false }), socialSignin);

// volunteerRoute.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// volunteerRoute.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialSignin);

export default volunteerRoute;
