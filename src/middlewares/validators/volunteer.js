import { check, param, query } from 'express-validator';

export const validateVolunteerAuth = [
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
  param('volunteer_id').not().isEmpty().withMessage('Please parse a volunteer_id as param'),
];

export const validateProfileUpdate = [
  param('volunteer_id').not().isEmpty().withMessage('Please parse a volunteer_id as param'),
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
  check('skillId', 'skillId is required')
    .exists()
    .isString(),
  check('educationlevel', 'educationlevel is required')
    .exists()
    .isString(),
  check('profession', 'profession is required')
    .exists()
    .isString(),
  check('prevOrganisationName', 'prevOrganisationName is required')
    .exists()
    .isString(),
  check('prevOrganisationRole', 'prevOrganisationRole is required')
    .exists()
    .isString(),
  check('startDate', 'startDate is required')
    .exists()
    .isString(),
  check('endDate', 'endDate is required')
    .exists()
    .isString(),
  ];

  export const validatePasswordReset = [
    param('volunteer_id').not().isEmpty().withMessage('Please parse a volunteer_id as param'),
  check('oldPassword', 'oldPassword is required')
    .exists()
    .isString()
    .trim(),
  check('newPassword', 'newPassword is required')
    .exists()
    .isString()
    .trim(),
  ];

export default { validateVolunteerAuth, validateProfileFetch, validateProfileUpdate, validatePasswordReset };
