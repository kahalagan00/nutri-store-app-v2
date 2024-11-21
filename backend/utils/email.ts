// const nodemailer = require('nodemailer');
// const pug = require('pug');
// const { htmlToText } = require('html-to-text');
import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

const RESET_TOKEN_TIME_LIMIT = 15;

export default class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;
  constructor(user: object, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Joshmar Morales <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Brevo Code
      return nodemailer.createTransport({
        // service: 'Brevo',
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_SMTPKEY,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject: string) {
    // WE ARE NOT RENDERING ANYTHING ON THE SERVER SIDE IN THIS PROJECT
    // 1) Render HTML based on pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject,
    // });

    const message = `
      Use the link below to reset your password:
     ${this.url}
    `;

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome to the Jhuv Nutri Store Family!');
  }

  async sendPasswordReset() {
    await this.send(
      `Your password reset token (valid for only ${RESET_TOKEN_TIME_LIMIT} minutes)`
    );
  }
}
