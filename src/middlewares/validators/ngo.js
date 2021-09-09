import { check } from 'express-validator';

export const validateNgoAuth = [
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

export default { validateNgoAuth };
