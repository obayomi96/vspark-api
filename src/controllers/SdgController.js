import models from '../database/models';
import utils from '../utils/response';

/**
 * @Module SdgController
 * @description Controlls all the user based activity
 */
class SdgController {

  /**
   * @static
   * @description Allows a user create sdg
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof SdgController
   */
  static async createSdg(req, res) {
    const sdg = await models.Sdg.create({
      ...req.body,
      userId: req.user.id,
    });
    return utils.successStat(res, 200, 'sdg', sdg);
  }

    /**
   * @description Allows user get opportunitiess
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof SdgController
   */
    static async fetchSdgs(req, res) {
    const sdgs = await models.Skill.findAll();
    if (!sdgs) {
      return utils.errorStat(res, 404, 'No sdgs found');
    }
    return utils.successStat(res, 200, 'sdgs', sdgs);
  }
}

export default SdgController;
