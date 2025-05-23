const nodemailer = require("nodemailer");
const sendMessage = (nom, prenom, email, objet, message) => {
    console.log("first")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `Support ${email}`,
    to: process.env.USER,
    subject: objet,
    html: message,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {sendMessage}