import { check, param, oneOf } from 'express-validator';

const typeMessage = 'Ngo type can only be profit or non-profit';

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

export const validateProfileFetch = [
  param('ngo_id').not().isEmpty().withMessage('Please parse a ngo_id as param'),
];

export const validateProfileUpdate = [
  param('ngo_id').not().isEmpty().withMessage('Please parse a ngo_id as param'),
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('name', 'name is required')
    .exists()
    .isString(),
  check('about', 'about is required')
    .exists()
    .isString(),
  check('country', 'country is required')
    .exists()
    .isString(),
  check('state', 'state is required')
    .exists()
    .isString(),
  check('city', 'city is required')
    .exists()
    .isString(),
  check('phonenumber', 'Phonenumber is required')
    .exists()
    .isString(),
  check('interestAreaId', 'interestAreaId is required')
    .exists()
    .isString(),
  oneOf([
      check('type').equals('profit').trim(),
      check('type').equals('non-profit').trim()
    ], typeMessage),
  check('industry', 'industry is required')
    .exists()
    .isString(),
  check('pastworkProjectName', 'pastworkProjectName is required')
    .exists()
    .isString(),
  check('pastworkStartDate', 'pastworkStartDate is required')
    .exists()
    .isString(),
  check('pastworkEndDate', 'pastworkEndDate is required')
    .exists()
    .isString(),
  check('pastworkAbout', 'pastworkAbout is required')
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

export default { validateNgoAuth, validateProfileFetch, validateProfileUpdate, validatePasswordReset };
