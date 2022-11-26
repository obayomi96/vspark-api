/* eslint-disable arrow-parens */
import { validationResult } from 'express-validator';

import utils from '../../utils/response';
import validateVolunteer from './volunteer';
import validateNgo from './ngo';
import validateUser from './user';

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

const handleValidation = async (req, res, next) => {
  let result = getErrors(req, next);
  if (result) result = [...new Set(getErrors(req, next))];
  return Array.isArray(result)
    ? utils.errorStat(res, 400, result)
    : result;
};

export default {
  handleValidation,
  validateVolunteer,
  validateNgo,
  validateUser
};
