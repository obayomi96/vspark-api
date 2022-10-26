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
class UserController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof UserController
   */
  static async userLogin(req, res) {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

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
      phonenumber: user.phonenumber,
      email: user.email,
    });
  }

  /**
  * @static
  * @description Send a user email on successful registration
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} object containing user data and access Token
  * @memberof UserController
  */
   static async confirmEmail(req, res) {
      const { token, id, resend } = req.query;

      if (resend) {
      const user = await models.User.findOne({ where: { id } });


      if (!user) return utils.errorStat(res, 400, 'Unable to send verification email');

      const message = {};
      const verifyLink = `${process.env.APP_URL}/api/v1/users/confirmEmail?token=${token}&id=${user.id}`
      message.subject = 'EMAIL CONFIRMATION';
      message.html = `
        <p>Hello!</p>
        <p>You have an account as a ${type} on the Volunteerspark platform</p>
        <p>kindly click the link below to verify your email <p>${verifyLink}</p></p>
        <br />
        <strong>VolunteerSpark team</strong>
      `;
    
    // implement emasil service
      await EmailService.sendEmail(user.email, message)
    
      return utils.successStat(res, 200, 'message', 'Verification link has been sent to your email');
      }
      try {
        const verify = await auth.verifyUserToken(token, (err, decoded) => decoded);

        await models.User.update({ isVerified: true }, { where: { id: verify.id } });
        const user = await models.User.findOne({ where: { id } });

        const message = {};
        message.subject = 'EMAIL VERIFIED';

        message.html = `
          <p>Welcome aboard!</p>
          <p>Your email have been successfully verified. Kindly proceed to your account and update your profile</p>
          <br />
          <strong>VolunteerSpark team</strong>
        `;
    
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
   * @memberof UserController
   */
  static async fetchOwnProfile(req, res) {
    const { user_id } = req.params;
    const { id } = req.user;
    if (!user_id) {
      return utils.errorStat(res, 400, 'user_id is required');
    }
    if (parseInt(user_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }
    const profile = await models.User.findOne({
      where: { id: user_id },
    });
    if (!profile) return utils.errorStat(res, 401, 'Profile not found');
    return utils.successStat(res, 200, 'profile', profile);
  }

  /**
   * @static
   * @description Allows a user to fetch thier profile
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Single Commentg
   * @memberof UserController
   */
  static async fetchProfile(req, res) {
    const { user_id } = req.params;
    const adminUser = req.user;
    if (!user_id) {
      return utils.errorStat(res, 400, 'user_id is required');
    }
    const user = await models.User.findOne({
      where: { id: parseInt(user_id, 10) },
    });
    if (!user) return utils.errorStat(res, 401, 'Profile not found');
    if (adminUser.type !== 'admin') {
      return utils.errorStat(res, 403, 'Unauthorized, admin only!');
    }
    return utils.successStat(res, 200, 'user', {
      email: user.email,
      firstname: user.firstname, 
      lastname: user.lastname, 
      phonenumber: user.phonenumber,
      country: user.country,
      state: user.state,
      city: user.city,
      type: user.type,
    });
  }

  /**
   * @description updates a user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated user profile
   * @memberof UserController
   */
  static async updateProfile(req, res) {
    const { firstname, lastname, phonenumner, email, country, state, city } = req.body;
    const { id } = req.user;
    const { user_id } = req.params;

    if (parseInt(user_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }

    const user = await models.User.findOne({
      where: {
        [Op.and]: [{ id: parseInt(user_id, 10) }, { id }],
      },
    });

    if (!user) {
      return utils.errorStat(res, 404, 'user not found.');
    }

    if (user.isVerified === false) {
      return utils.errorStat(res, 404, 'You need to verify your email first');
    }

    await models.User.update(
      { email, firstname, lastname, phonenumner, country, state, city },
      {
        returning: true,
        where: {
          [Op.and]: [{ id: parseInt(user_id, 10) }, { id }],
        },
      }
    );

    const updateResponse = await models.User.findOne({
      where: {
        [Op.and]: [{ id }, { id: parseInt(user_id, 10) }],
      },
    });

    return utils.successStat(res, 200, 'profile', {
      firstname: updateResponse.firstname, 
      lastname: updateResponse.lastname, 
      email: updateResponse.email,
      phonenumber: updateResponse.phonenumber,
      country: updateResponse.country,
      state: updateResponse.state,
      city: updateResponse.city,
      type: updateResponse.type,
    });
  }

    /**
    * @static
    * @description Updates the user password in the database
    * @param {Object} req - Request object
    * @param {Object} res - Response object
    * @returns {Object} Object containing either a success or error message.
    * @memberof UserController
    */
     static async resetPassword(req, res) {
      const { oldPassword, newPassword } = req.body;
      const { user_id } = req.params;
      const { id } = req.user;
      const user = await models.User.findOne({ where: { id: parseInt(user_id, 10) } });
      if (!user) return utils.errorStat(res, 404, 'No user found');
      if (parseInt(user_id, 10) !== id) {
        return utils.errorStat(res, 403, 'Unauthorized');
      }
      const comparedPassword = auth.comparePassword(oldPassword, user.password)
      if (!comparedPassword) return utils.errorStat(res, 404, 'Old password incorrect');
      const hashedPassword = auth.hashPassword(newPassword);
      await models.User.update({ password: hashedPassword }, { where: { id: parseInt(user_id, 10) } });
      return utils.successStat(res, 200, 'message', 'Success, Password Reset Successfully');
    }

    /**
  * @static
  * @description Allows a user to sign in with social accounts
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {function} next next function to be called
  * @returns {Object} object containing user data and access Token
  * @memberof UserController
  */
  static async socialSignin(req, res) {
    const userDetails = req.user;
    const firstname = userDetails.displayName.split(' ')[0];
    const lastname = userDetails.displayName.split(' ')[1];
    const email = userDetails.emails[0].value;

    const newUser = await models.User.findOrCreate({
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

export default UserController;
