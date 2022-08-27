const nodemailer = require("nodemailer");
const user = process.env.EMAIL;


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: process.env.PASS,
  },
});

module.exports = {
  sendConfirmationEmail(name, email, token) {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your discord account",
      html: `<h1>Email Verification</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for joining Binary Brains Discord Server. Please confirm your email by clicking on the following link</p>
          <a href=${token}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  },
};