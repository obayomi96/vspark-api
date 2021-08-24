/* eslint-disable camelcase */
import models from '../database/models';
import utils from '../utils/response';

/**
 * @Module SkillController
 * @description Controlls all the user based activity
 */
class SkillController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof SkillController
   */
  static async createSkill(req, res) {
    const skill = await models.Skill.create({
      ...req.body,
      userId: req.user.id,
    });
    return utils.successStat(res, 200, 'skill', skill);
  }

    /**
   * @description Allows user get opportunitiess
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof VolunteerController
   */
    static async fetchSkills(req, res) {
    const skills = await models.Skill.findAll();
    if (!skills) {
      return utils.errorStat(res, 404, 'No skills found');
    }
    return utils.successStat(res, 200, 'skills', skills);
  }
  
}

export default SkillController;
