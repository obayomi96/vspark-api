/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../database/models';
import utils from '../utils/response';

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
    const project = await models.Project.create({
      ...req.body,
      userId: req.user.id,
    });

    return utils.successStat(res, 200, 'project', project);
  }

   /**
   * @static
   * @description Allows a user to fetch own profile
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single user profile
   * @memberof ProjectController
   */
    static async fetchProject(req, res) {
      const { project_id } = req.params;
      if (!project_id) {
        return utils.errorStat(res, 400, 'project_id is required');
      }
      const project = await models.Project.findOne({
        where: { id: parseInt(project_id, 10) },
        include: [
          {
            as: 'sdgs',
            model: models.Sdg,
            attributes: ['id', 'name', 'description'],
          },
          {
            as: 'skills',
            model: models.Skill,
            attributes: ['id', 'name', 'description'],
          },
          {
            as: 'interestAreas',
            model: models.InterestArea,
            attributes: ['id', 'name', 'description'],
          }
        ]
      });
      if (!project) return utils.errorStat(res, 401, 'project not found');
      return utils.successStat(res, 200, 'project', project);
    }

      /**
   * @description updates a user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated user profile
   * @memberof VolunteerController
   */
  static async updateProject(req, res) {
    const { project_id } = req.params;

    const project = await models.Project.findOne({
      where: {
        [Op.and]: [{ id: parseInt(project_id, 10) }],
      },
    });

    if (!project) {
      return utils.errorStat(res, 404, 'project not found.');
    }

    if (project.isVerified === false) {
      return utils.errorStat(res, 404, 'You need to verify your email first');
    }

    await models.Project.update(
      req.body,
      {
        returning: true,
        where: { id: parseInt(project_id, 10) }
      }
    );

    const updateResponse = await models.Project.findOne({
      where: { id: parseInt(project_id, 10) }
    });

    return utils.successStat(res, 200, 'project', updateResponse);
  }

     /**
   * @description Allows user get opportunitiess
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns Comments
   * @memberof VolunteerController
   */
    static async fetchProjects(req, res) {
      const projects = await models.Project.findAll({
        include: [
          {
            as: 'sdgs',
            model: models.Sdg,
            attributes: ['id', 'name', 'description'],
          },
          {
            as: 'skills',
            model: models.Skill,
            attributes: ['id', 'name', 'description'],
          },
          {
            as: 'interestAreas',
            model: models.InterestArea,
            attributes: ['id', 'name', 'description'],
          }
        ]
      });
      if (!projects) {
        return utils.errorStat(res, 404, 'No projects found');
      }
      return utils.successStat(res, 200, 'projects', projects);
    }
}

export default ProjectController;
