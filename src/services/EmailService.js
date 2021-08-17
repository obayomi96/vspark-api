/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import SGmail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const { SENDGRID_API_KEY, API_EMAIL } = process.env;

SGmail.setApiKey(SENDGRID_API_KEY);

class EmailService {
  sendEmail(email, message) {
    const { subject, html } = message;
    const mail = {
      to: email,
      from: {
        email: API_EMAIL,
      },
      subject,
      html,
    };
    SGmail
      .send(mail)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    console.log('done')
  }
}

export default new EmailService();
