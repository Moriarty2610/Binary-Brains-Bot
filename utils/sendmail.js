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
  sendConfirmationEmail(tag, email, token, name) {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your discord account",
      html: `<div>
            	<h1>Email Verification</h1>
            	<h2>Hello ${name}</h2>
            	<p>
            		Thank you for joining Binary Brains Discord Server. Please confirm your
            		Discord Id <b>${tag}</b> by verifying with following token :
            	</p>
            	<code>${token}</code>
            	<p><i><b>NOTE:</b> Do not use this token if you did not initiate this verification</i></p>
            </div>`,
    }).catch(err => console.log(err));
  },
};