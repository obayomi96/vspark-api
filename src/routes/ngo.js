import express from 'express';
import NgoController from '../controllers/NgoController';
import middlewares from '../middlewares';
import validators from '../middlewares/validators'

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
  isAdmin,
  isNgo,
  verifyNgo,
} = middlewares;

const { 
  validateNgo: { 
    validateNgoAuth,
    validateProfileFetch,
    validateProfileUpdate,
    validatePasswordReset
  },
  handleValidation } = validators;

const ngoRoute = express();

ngoRoute.post('/register', validateNgoAuth, handleValidation, ngoSignup);
ngoRoute.post('/login', validateNgoAuth, handleValidation, ngoLogin);
ngoRoute.get('/:ngo_id', validateProfileFetch, handleValidation, verifyNgo, fetchProfile);
ngoRoute.patch('/:ngo_id', validateProfileUpdate, handleValidation, verifyNgo, updateProfile);
ngoRoute.get('/confirm-email', verifyNgo, confirmEmail);
ngoRoute.patch('/password-reset/:ngo_id', validatePasswordReset, handleValidation, verifyNgo, resetPassword);
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
