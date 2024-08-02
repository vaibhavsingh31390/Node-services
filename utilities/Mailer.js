const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

module.exports = class Email {
  constructor(data) {
    this.from = process.env.EMAIL_FROM;
    this.to = process.env.EMAIL_TOME;
    this.name = data.name;
    this.fromName = `Portfolio | Vaibhav`;
    this.phone = data.phone;
    this.message = data.message;
    this.templateDir = path.join(__dirname, "../Views/EmailTemplates");
  }

  createTransporter() {
    if (process.env.NODE_ENV === "production") {
      //SENDGRID or any other production transporter setup
      return 1;
    } else {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        from: this.fromName,
      });
    }
  }

  async send(template, mailSubject, data) {
    const templateFile = path.join(this.templateDir, `${template}.ejs`);

    const emailOptions = {
      from: this.fromName,
      to: this.to,
      subject: mailSubject,
    };
    data.subject = mailSubject;
    try {
      const html = await ejs.renderFile(templateFile, {
        data,
      });
      emailOptions.html = html;
      const status = await this.createTransporter().sendMail(emailOptions);
      if (status) {
        console.log("Email Sent");
        return true;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendMessage(data) {
    const response = await this.send(
      "Template",
      "New Customer Contact Request",
      data
    );
    if (response) {
      return true;
    } else {
      return false;
    }
  }
};
