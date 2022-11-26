import { check, param } from 'express-validator';

export const validateUserAuth = [
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'Password is required')
    .exists()
    .trim()
    .isString()
    .isLength({ min: 4, max: 30 }),
];

export const validateProfileFetch = [
  param('user_id').not().isEmpty().withMessage('Please parse a user_id as param'),
];

export const validateProfileUpdate = [
  param('user_id').not().isEmpty().withMessage('Please parse a user_id as param'),
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('firstname', 'firstname is required')
    .exists()
    .isString(),
  check('lastname', 'lastname is required')
    .exists()
    .isString(),
  check('phonenumber', 'Phonenumber is required')
    .exists()
    .isString(),
  ];

  export const validatePasswordReset = [
    param('ngo_id').not().isEmpty().withMessage('Please parse a ngo_id as param'),
  check('oldPassword', 'oldPassword is required')
    .exists()
    .isString()
    .trim(),
  check('newPassword', 'newPassword is required')
    .exists()
    .isString()
    .trim(),
  ];

export default { validateUserAuth, validateProfileFetch, validateProfileUpdate, validatePasswordReset };
