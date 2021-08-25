/* eslint-disable camelcase */
import models from '../database/models';
import utils from '../utils/response';

/**
 * @Module InterestAreaController
 * @description Controlls all the user based activity
 */
class InterestAreaController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof InterestAreaController
   */
  static async createInterestArea(req, res) {
    const interestArea = await models.InterestArea.create({
      ...req.body,
      // userId: req.user.id,
    });
    return utils.successStat(res, 200, 'interestArea', interestArea);
  }

    /**
   * @description Allows user get opportunitiess
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof VolunteerController
   */
    static async fetchInterestArea(req, res) {
    const interestAreas = await models.InterestArea.findAll();
    if (!interestAreas) {
      return utils.errorStat(res, 404, 'No interestAreas found');
    }
    return utils.successStat(res, 200, 'interestAreas', interestAreas);
  }
  
}

export default InterestAreaController;
