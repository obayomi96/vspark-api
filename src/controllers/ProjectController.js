/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../database/models';
import utils from '../utils/response';
import auth from '../utils/auth';
import EmailService from '../services/EmailService';

const { Op } = sequelize;

/**
 * @Module UserController
 * @description Controlls all the user based activity
 */
class ProjectController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof ProjectController
   */
  static async createProject(req, res) {
    const body = req.body;
    const project = await models.Project.create({
      body,
      userId: req.user.id,
    });

    console.log('pro', project)

    return utils.successStat(res, 200, 'project', {
      ...project
    });
  }
}

export default ProjectController;
