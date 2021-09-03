/* eslint-disable camelcase */
import sequelize from 'sequelize';
import models from '../database/models';
import utils from '../utils/response';
import auth from '../utils/auth';
import EmailService from '../services/EmailService';

const { Op } = sequelize;

/**
 * @Module NgoController
 * @description Controlls all the user based activity
 */
class NgoController {
  /**
   * @static
   * @description Allows a user to sign up
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof NgoController
   */
  static async ngoSignup(req, res) {
    const { email, password } = req.body;
    const existingUser = await models.Ngo.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });
    if (existingUser) {
      return utils.errorStat(res, 409, 'NGO Already Exists');
    }
    const newUser = { ...req.body, password: auth.hashPassword(password) };
    const ngo = await models.Ngo.create(newUser);

    const token = auth.generateToken({ id: ngo.id, email: ngo.email });

    const message = {};
    const verifyLink = `${process.env.APP_URL}/api/v1/ngo/confirmEmail?token=${token}&id=${ngo.id}`
    message.subject = 'NEW ORGANISATION CREATED';
    message.html = `
      <p>Hello!</p>
      <p>A new organisation was just created for you  on the Volunteerspark platform</p>
      <p>Your password is <strong>${password}</strong>, you can update this password once you login</p>
      <p>kindly click the link below to verify your company email <p>${verifyLink}</p></p>
      <br />
      <strong>VolunteerSpark team</strong>
    `;
  
    // implement emasil service
    await EmailService.sendEmail(email, message)

    return utils.successStat(res, 201, 'ngo', {
      id: ngo.id,
      token,
      email: ngo.email,
    });
  }

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof NgoController
   */
  static async ngoLogin(req, res) {
    const { email, password } = req.body;
    const ngo = await models.Ngo.findOne({ where: { email } });

    if (!ngo)
      return utils.errorStat(
        res,
        401,
        'Orgnaisation not found, check your login details'
      );
    const matchPasswords = auth.comparePassword(password, ngo.password);
    if (!matchPasswords) {
      return utils.errorStat(res, 401, 'Incorrect Login information');
    }
    return utils.successStat(res, 200, 'ngo', {
      id: ngo.id,
      token: await auth.generateToken({
        id: ngo.id,
        email: ngo.email,
      }),
      email: ngo.email,
      name: ngo.name
    });
  }

  /**
  * @static
  * @description Send a user email on successful registration
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} object containing user data and access Token
  * @memberof NgoController
  */
   static async confirmEmail(req, res) {
      const { token, id, resend } = req.query;

      if (resend) {
      const user = await models.Ngo.findOne({ where: { id } });


      if (!user) return utils.errorStat(res, 400, 'Unable to send verification email');

      const message = {};
      const verifyLink = `${process.env.APP_URL}/api/v1/ngo/confirmEmail?token=${token}&id=${user.id}`
      message.subject = 'EMAIL CONFIRMATION';
      message.html = `
        <p>Hello!</p>
        <p>You have an ngo account on the Volunteerspark platform</p>
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

        await models.Ngo.update({ isVerified: true }, { where: { id: verify.id } });
        const user = await models.Ngo.findOne({ where: { id } });

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
   * @memberof NgoController
   */
  static async fetchProfile(req, res) {
    const { ngo_id } = req.params;
    const { id } = req.user;
    if (!ngo_id) {
      return utils.errorStat(res, 400, 'ngo_id is required');
    }
    if (parseInt(ngo_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }
    const profile = await models.Ngo.findOne({
      where: { id: ngo_id },
      include: [
        {
          as: 'sdgs',
          model: models.Sdg,
          attributes: ['id', 'name', 'description'],
        },
        {
          as: 'interestAreas',
          model: models.InterestArea,
          attributes: ['id', 'name', 'description'],
        }
      ]
    });
    if (!profile) return utils.errorStat(res, 401, 'Profile not found');
    return utils.successStat(res, 200, 'profile', profile);
  }

  /**
   * @description updates a user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} returns updated user profile
   * @memberof NgoController
   */
  static async updateProfile(req, res) {
    const { name, about, phonenumner, type, industry, state, city, country, address, website, email, linkedin, instagram, twitter,verificationDocument,beneficiaries,beneficiaryDemographic,pastworkProjectName ,pastworkStartDate,pastworkEndDate,pastworkDuration,pastworkAbout,pastworkBeneficiariesReached,pastworkNumberOfVolunteers,sdgId,interestAreaId } = req.body;
    // return console.log('lll', req)
    const { id } = req.user;
    const { ngo_id } = req.params;

    if (parseInt(ngo_id, 10) !== id) {
      return utils.errorStat(res, 403, 'Unauthorized');
    }

    const user = await models.Ngo.findOne({
      where: {
        [Op.and]: [{ id: parseInt(ngo_id, 10) }, { id }],
      },
    });

    if (!user) {
      return utils.errorStat(res, 404, 'user not found.');
    }

    if (user.isVerified === false) {
      return utils.errorStat(res, 404, 'You need to verify your email first');
    }

    await models.Ngo.update(
      { name, about, phonenumner, type, industry, state, city, country, address, website, email, linkedin, instagram, twitter,verificationDocument,beneficiaries,beneficiaryDemographic,pastworkProjectName ,pastworkStartDate,pastworkEndDate,pastworkDuration,pastworkAbout,pastworkBeneficiariesReached,pastworkNumberOfVolunteers,sdgId,interestAreaId},
      {
        returning: true,
        where: {
          [Op.and]: [{ id: parseInt(ngo_id, 10) }, { id }],
        },
      }
    );

    const updateResponse = await models.Ngo.findOne({
      where: {
        [Op.and]: [{ id }, { id: ngo_id }],
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
      const { ngo_id } = req.params;
      const { id } = req.user;
      const user = await models.Ngo.findOne({ where: { id: ngo_id } });
      if (!user) return utils.errorStat(res, 404, 'No user found');
      if (parseInt(ngo_id, 10) !== id) {
        return utils.errorStat(res, 403, 'Unauthorized');
      }
      const comparedPassword = auth.comparePassword(oldPassword, user.password)
      if (!comparedPassword) return utils.errorStat(res, 404, 'Old password incorrect');
      const hashedPassword = auth.hashPassword(newPassword);
      await models.Ngo.update({ password: hashedPassword }, { where: { id: user.id } });
      return utils.successStat(res, 200, 'message', 'Success, Password Reset Successfully');
    }

    /**
  * @static
  * @description Allows a user to sign in with social accounts
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {function} next next function to be called
  * @returns {Object} object containing user data and access Token
  * @memberof NgoController
  */
  static async socialSignin(req, res) {
    const userDetails = req.user;
    const name = userDetails.displayName.split(' ')[0];
    const email = userDetails.emails[0].value;

    const newUser = await models.Ngo.findOrCreate({
      where: { email },
      defaults: {
        name,
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
      name, email, isVerified
    })}`);
  }

}

export default NgoController;
 