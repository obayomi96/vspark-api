/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../database/models';
import utils from '../utils/response';
import auth from '../utils/auth';
import EmailService from '../services/EmailService';

const { Op } = sequelize;

/**
 * @Module VolunteerController
 * @description Controlls all the user based activity
 */
class VolunteerController {
  /**
   * @static
   * @description Allows a user to sign up
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof VolunteerController
   */
  static async volunteerSignup(req, res) {
    const { email, password } = req.body;
    const existingUser = await models.Volunteer.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });
    if (existingUser) {
      return utils.errorStat(res, 409, 'User Already Exists');
    }
    const newUser = { ...req.body, password: auth.hashPassword(password) };
    const user = await models.Volunteer.create(newUser);
    const token = auth.generateToken({ id: user.id, email: user.email });

    const message = {};
    const verifyLink = `${process.env.APP_URL}/api/v1/users/confirmEmail?token=${token}&id=${user.id}`
    message.subject = 'WELCOME TO VOLUNTEERSPARK';
    message.html = `
      <p>Hello!</p>
      <p>An account was just created for you as a Volunteer on the Volunteerspark platform</p>
      <p>We are so excited to have you and can't wait to get you connected with other organisations on out network.</p>
      <p>Your password is <strong>${password}</strong>, you can update this password once you login</p>
      <p>kindly click the link below to verify your email <p>${verifyLink}</p></p>
      <br />
      <strong>VolunteerSpark team</strong>
    `; ;
  
    // implement emasil service
    await EmailService.sendEmail(email, message)

    return utils.successStat(res, 201, 'user', {
      id: user.id,
      token,
      email: user.email,
    });
  }

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof VolunteerController
   */
  static async volunteerLogin(req, res) {
    const { email, password } = req.body;
    const user = await models.Volunteer.findOne({ where: { email } });

    if (!user)
      return utils.errorStat(
        res,
        401,
        'User not found, check your login details'
      );
    const matchPasswords = auth.comparePassword(password, user.password);
    if (!matchPasswords) {
      return utils.errorStat(res, 401, 'Incorrect Login information');
    }
    return utils.successStat(res, 200, 'user', {
      id: user.id,
      token: await auth.generateToken({
        id: user.id,
        email: user.email,
      }),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }

  /**
  * @static
  * @description Send a user email on successful registration
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} object containing user data and access Token
  * @memberof VolunteerController
  */
   static async confirmEmail(req, res) {
      const { token, id, resend } = req.query;

      if (resend) {
      const user = await models.Volunteer.findOne({ where: { id } });


      if (!user) return utils.errorStat(res, 400, 'Unable to send verification email');

      const message = {};
      const verifyLink = `${process.env.APP_URL}/api/v1/users/confirmEmail?token=${token}&id=${user.id}`
      message.subject = 'EMAIL CONFIRMATION';
      message.html = `
        <p>Hello!</p>
        <p>You have an account as a ${type} on the Volunteerspark platform</p>
        <p>We are so excited to have you and can't wait to get you connected with other organisations on out network.</p>
        <p>kindly click the link below to verify your email <p>${verifyLink}</p></p>
        <br />
        <strong>VolunteerSpark team</strong>
      `; ;
    
    // implement emasil service
      await EmailService.sendEmail(user.email, message)
    
      return utils.successStat(res, 200, 'message', 'Verification link has been sent to your email');
      }
      try {
        const verify = await auth.verifyUserToken(token, (err, decoded) => decoded);

        await models.Volunteer.update({ isVerified: true }, { where: { id: verify.id } });
        const user = await models.Volunteer.findOne({ where: { id } });

        const message = {};
        message.subject = 'EMAIL VERIFIED';

        message.html = `
          <p>Welcome aboard!</p>
          <p>Your email have been successfully verified. Kindly proceed to your account and update your profile</p>
          <br />
          <strong>VolunteerSpark team</strong>
        `; ;
    
        await EmailService.sendEmail(user.email, message)

        return utils.successStat(res, 200, 'message', 'Email verified successfully');
      } catch (err) {
        return utils.errorStat(res, 400, 'Unable to verifiy email');
      }
    }

  /**
   * @static
   * @description Allows a user to fetch own profile
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single user profile
   * @memberof VolunteerController
   */
  static async fetchProfile(req, res) {
    const { volunteer_id } = req.params;
    const { id } = req.user;
    if (!volunteer_id) {
      return utils.errorStat(res, 400, 'volunteer_id is required');
    }
    if (parseInt(volunteer_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }
    const profile = await models.Volunteer.findOne({
      where: { id: volunteer_id },
    });
    if (!profile) return utils.errorStat(res, 401, 'Profile not found');
    return utils.successStat(res, 200, 'profile', profile);
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
            as: 'volunteer',
            model: models.Volunteer,
            attributes: ['id', 'firstname', 'lastname', 'email'],
          },
        ],
      });
      if (!opportunities) {
        return utils.errorStat(res, 404, 'No opportunities found');
      }
      return utils.successStat(res, 200, 'opportunities', opportunities);
    }

  /**
   * @description updates a user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated user profile
   * @memberof VolunteerController
   */
  static async updateProfile(req, res) {
    const { id } = req.user;
    const { volunteer_id } = req.params;

    if (parseInt(volunteer_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }

    const user = await models.Volunteer.findOne({
      where: {
        [Op.and]: [{ id: parseInt(volunteer_id, 10) }, { id }],
      },
    });

    if (!user) {
      return utils.errorStat(res, 404, 'user not found.');
    }

    if (user.isVerified === false) {
      return utils.errorStat(res, 404, 'You need to verify your email first');
    }

    await models.Volunteer.update(
      ...req.body,
      {
        returning: true,
        where: {
          [Op.and]: [{ id: parseInt(volunteer_id, 10) }, { id }],
        },
      }
    );

    const updateResponse = await models.Volunteer.findOne({
      where: {
        [Op.and]: [{ id }, { id: volunteer_id }],
      },
    });

    return utils.successStat(res, 200, 'profile', updateResponse);
  }

    /**
    * @static
    * @description Updates the user password in the database
    * @param {Object} req - Request object
    * @param {Object} res - Response object
    * @returns {Object} Object containing either a success or error message.
    * @memberof VolunteerController
    */
     static async resetPassword(req, res) {
      const { oldPassword, newPassword } = req.body;
      const { volunteer_id } = req.params;
      const { id } = req.user;
      const user = await models.Volunteer.findOne({ where: { id: volunteer_id } });
      if (!user) return utils.errorStat(res, 404, 'No user found');
      if (parseInt(volunteer_id, 10) !== id) {
        return utils.errorStat(res, 403, 'Unauthorized');
      }
      const comparedPassword = auth.comparePassword(oldPassword, user.password)
      if (!comparedPassword) return utils.errorStat(res, 404, 'Old password incorrect');
      const hashedPassword = auth.hashPassword(newPassword);
      await models.Volunteer.update({ password: hashedPassword }, { where: { id: user.id } });
      return utils.successStat(res, 200, 'message', 'Success, Password Reset Successfully');
    }

    /**
  * @static
  * @description Allows a user to sign in with social accounts
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {function} next next function to be called
  * @returns {Object} object containing user data and access Token
  * @memberof VolunteerController
  */
  static async socialSignin(req, res) {
    const userDetails = req.user;
    const firstname = userDetails.displayName.split(' ')[0];
    const lastname = userDetails.displayName.split(' ')[1];
    const email = userDetails.emails[0].value;

    const newUser = await models.Volunteer.findOrCreate({
      where: { email },
      defaults: {
        firstname,
        lastname,
        email,
        password: 'null',
        isVerified: true,
      }
    });
    const token = auth.generateToken({
      id: newUser.id,
      email: userDetails.email
    });

    return res.redirect(`${process.env.FRONT_END_URL}?token=${token}&user=${JSON.stringify({
      firstname, lastname, email, isVerified
    })}`);
  }
}

export default VolunteerController;
