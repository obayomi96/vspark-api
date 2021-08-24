import utils from '../utils/response';
import auth from '../utils/auth';
import models from '../database/models';

const { errorStat } = utils;

/**
 * @Module Authenticate
 * @description Authentication related methods
 */
class Authenticate {
  /**
   * @static
   * @description Authenticate the routes
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
  static async verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return errorStat(res, 401, 'Authorization error');
    const token =
      req.headers.authorization.split(' ')[1] || authorizationHeader;
    let verifiedUser;
    try {
      verifiedUser = await auth.verifyUserToken(token, async (err, decoded) => {
        if (err) {
          throw new Error();
        }
        return decoded;
      });
    } catch (err) {
      return errorStat(res, 401, 'invalid token');
    }
    const { id } = verifiedUser;
    const user = await models.User.findByPk(id);
    if (!user) {
      return errorStat(res, 404, 'user not found');
    }
    req.user = user;
    return next();
  }

  /**
   * @static
   * @description Authenticate the routes
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
   static async verifyNgo(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return errorStat(res, 401, 'Authorization error');
    const token =
      req.headers.authorization.split(' ')[1] || authorizationHeader;
    let verifiedUser;
    try {
      verifiedUser = await auth.verifyUserToken(token, async (err, decoded) => {
        if (err) {
          throw new Error();
        }
        return decoded;
      });
    } catch (err) {
      return errorStat(res, 401, 'invalid token');
    }
    const { id } = verifiedUser;
    const user = await models.Ngo.findByPk(id);
    if (!user) {
      return errorStat(res, 404, 'user not found');
    }
    req.user = user;
    return next();
  }

  /**
   * @static
   * @description Authenticate the routes
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
   static async verifyVolunteer(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return errorStat(res, 401, 'Authorization error');
    const token =
      req.headers.authorization.split(' ')[1] || authorizationHeader;
    let verifiedUser;
    try {
      verifiedUser = await auth.verifyUserToken(token, async (err, decoded) => {
        if (err) {
          throw new Error();
        }
        return decoded;
      });
    } catch (err) {
      return errorStat(res, 401, 'invalid token');
    }
    const { id } = verifiedUser;
    const user = await models.Volunteer.findByPk(id);
    if (!user) {
      return errorStat(res, 404, 'user not found');
    }
    req.user = user;
    return next();
  }

  /**
   * @static
   * @description Gets user details if the user is logged in. But returns next with
   * no details if the user is not logged in
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
  static async optionalLogin(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next();
    return Authenticate.verifyToken(req, res, next);
  }

  /**
   * @static
   * @descripttion Middleware to check if user is active before they can perform certain actions
   * @param {*} req  - Request Obj
   * @param {*} res  - Response Obj
   * @param {*} next - Next function call
   * @returns {object} Json
   * @returns {Function} - next function call
   */
   static async isVerified(req, res, next) {
    const { isVerified } = req.user;
    if (!isVerified) return errorStat(res, 401, 'Authorization error');
    return next();
  }

  /**
   *
   * @param {*} req - Request Obj
   * @param {*} res - Response Obj
   * @param {*} next - Next function call
   * @returns {object} Json
   * @return {Function} - next function call
   */
  static async isAdmin(req, res, next) {
    const { type } = req.user;
    if (type !== 'admin') return errorStat(res, 401, 'Authorization error, admin only!');
    return next();
  }

   /**
   *
   * @param {*} req - Request Obj
   * @param {*} res - Response Obj
   * @param {*} next - Next function call
   * @returns {object} Json
   * @return {Function} - next function call
   */
    static async isNgo(req, res, next) {
      const { type } = req.user;
      if (type !== 'profit' && type !== 'non-profit') return errorStat(res, 401, 'Authorization error, NGOs only!');
      return next();
    }

      /**
   *
   * @param {*} req - Request Obj
   * @param {*} res - Response Obj
   * @param {*} next - Next function call
   * @returns {object} Json
   * @return {Function} - next function call
   */
       static async isVolunteer(req, res, next) {
        const { type } = req.user;
        if (type !== 'volunteer') return errorStat(res, 401, 'Authorization error, NGOs only!');
        return next();
      }
}

export default Authenticate;
