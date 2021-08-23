/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../database/models';
import utils from '../utils/response';

const { Op } = sequelize;

/**
 * @Module OpportunityController
 * @description Controlls all the user based activity
 */
class OpportunityController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof OpportunityController
   */
  static async createOpportunity(req, res) {
    const body = req.body;
    const opportunity = await models.Opportunity.create({
      body,
      userId: req.user.id,
    });

    console.log('pro', opportunity)

    return utils.successStat(res, 200, 'opportunity', {
      ...opportunity
    });
  }
}

export default OpportunityController;
