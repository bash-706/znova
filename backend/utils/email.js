const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user = null, url = null) {
    if (user) {
      this.to = user.email;
      this.firstName = user.name.split(' ')[0];
    }
    this.url = url;
    this.from = `Adnan Chaudhary <${process.env.EMAIL_From}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }
    return nodemailer.createTransport({
      // We can use predefined services instead of defining host and port => service: 'Gmail'
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1. Render html based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );
    // 2. Specify the mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };
    // 3. Create the transporter and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async verifyEmail() {
    await this.send('verify', 'Verify Your Email Address');
  }

  async resetEmail() {
    await this.send('reset', 'Reset Your Password');
  }

  async activateAccount() {
    await this.send('activate', 'Activate Your Account');
  }

  async sendContactEmail(name, email, subject, message) {
    const html = pug.renderFile(`${__dirname}/../views/emails/contact.pug`, {
      name,
      email,
      subject,
      message,
    });
    const mailOption = {
      from: email,
      to: process.env.EMAIL_From,
      subject: `ZNova - ${subject} | ${name}`,
      html,
      text: htmlToText.convert(html),
    };
    await this.newTransport().sendMail(mailOption);
  }
};
