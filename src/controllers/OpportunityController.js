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
    const opportunity = await models.Opportunity.create({
      ...req.body,
      userId: req.user.id,
    });
    return utils.successStat(res, 200, 'opportunity', opportunity);
  }

  /**
   * @static
   * @description Allows a user to fetch own profile
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single user profile
   * @memberof ProjectController
   */
   static async fetchOpportunity(req, res) {
    const { opportunity_id } = req.params;
    if (!opportunity_id) {
      return utils.errorStat(res, 400, 'opportunity_id is required');
    }
    const opportunity = await models.Opportunity.findOne({
      where: { id: parseInt(opportunity_id, 10) },
      include: [
        {
          as: 'volunteers',
          model: models.Volunteer,
          attributes: ['id', 'firstname', 'lastname', 'email'],
        },
        {
          as: 'project',
          model: models.Project,
          attributes: ['id', 'type', 'about'],
        },
        {
          as: 'skills',
          model: models.Skill,
          attributes: ['id', 'name'],
        }
      ],
    });
    if (!opportunity) return utils.errorStat(res, 401, 'opportunity not found');
    return utils.successStat(res, 200, 'opportunity', opportunity);
  }

    /**
 * @description updates a user profile
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} returns updated user profile
 * @memberof OpportunityController
 */
  static async updateOpportunity(req, res) {
    const { opportunity_id } = req.params;

    const opportunity = await models.Opportunity.findOne({
      where: {
        [Op.and]: [{ id: parseInt(opportunity_id, 10) }],
      },
    });

    if (!opportunity) {
      return utils.errorStat(res, 404, 'opportunity not found.');
    }

    if (opportunity.isVerified === false) {
      return utils.errorStat(res, 404, 'You need to verify your email first');
    }

    await models.Opportunity.update(
      req.body,
      {
        returning: true,
        where: { id: parseInt(opportunity_id, 10) }
      }
    );

    const updateResponse = await models.Opportunity.findOne({
      where: { id: parseInt(opportunity_id, 10) }
    });

    return utils.successStat(res, 200, 'opportunity', updateResponse);
  }

  static async applyForOpportunity(req, res) {
    const { opportunity_id } = req.params;

    const opportunity = await models.Opportunity.findOne({
      where: {
        [Op.and]: [{ id: parseInt(opportunity_id, 10) }],
      },
    });

    if (!opportunity) {
      return utils.errorStat(res, 404, 'opportunity not found.');
    }

    await models.Opportunity.update(
      {volunteerId: req.user.id},
      {
        returning: true,
        where: { id: parseInt(opportunity_id, 10) }
      }
    );

    await models.Volunteer.update(
      {opportunityId: opportunity_id},
      {
        returning: true,
        where: { id: parseInt(req.user.id, 10) }
      }
    );

    const updateResponse = await models.Opportunity.findOne({
      where: { id: parseInt(opportunity_id, 10) }
    });

    return utils.successStat(res, 200, 'opportunity', updateResponse);
  }

    /**
   * @description Allows user get opportunitiess
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof VolunteerController
   */
     static async fetchOpportunities(req, res) {
      const opportunities = await models.Opportunity.findAll({
        include: [
          {
            as: 'volunteers',
            model: models.Volunteer,
            attributes: ['id', 'firstname', 'lastname', 'email'],
          },
          {
            as: 'project',
            model: models.Project,
            attributes: ['id', 'type', 'about'],
          },
          {
            as: 'skills',
            model: models.Skill,
            attributes: ['id', 'name'],
          }
        ],
      });
      if (!opportunities) {
        return utils.errorStat(res, 404, 'No opportunities found');
      }
      return utils.successStat(res, 200, 'opportunities', opportunities);
    }
  
}

export default OpportunityController;
