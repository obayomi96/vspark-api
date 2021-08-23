import express from 'express';
import NgoController from '../controllers/NgoController';
import middlewares from '../middlewares';

const {
  ngoLogin,
  ngoSignup,
  updateProfile,
  fetchProfile,
  confirmEmail,
  resetPassword,
  // socialSignin
} = NgoController;

const {
  verifyToken,
  isAdmin
} = middlewares;

const ngoRoute = express();

ngoRoute.post('/register', ngoSignup);
ngoRoute.post('/login', ngoLogin);
ngoRoute.get('/:ngo_id', verifyToken, fetchProfile);
// ngoRoute.get('/', verifyToken, fetchngos);
ngoRoute.patch('/:ngo_id', verifyToken, updateProfile);
ngoRoute.get('/confirm-email', verifyToken, confirmEmail);
ngoRoute.patch('/password-reset/:id', verifyToken, resetPassword);
// ngoRoute.post('/project', createProject);
// ngoRoute.post('/opportunity', createOpportunities);


// ngoRoute.get('/google', passport.authenticate('google', {
//   scope:
//   ['https://www.googleapis.com/auth/ngoinfo.profile', 'https://www.googleapis.com/auth/ngoinfo.email']
// }));
// ngoRoute.get('/google/callback', passport.authenticate('google', { session: false }), socialSignin);

// ngoRoute.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// ngoRoute.get('/facebook/callback', passport.authenticate('facebook', { session: false }), socialSignin);

export default ngoRoute;
