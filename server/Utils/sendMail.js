const nodemailer = require("nodemailer");

const sendEmail = async (newUser, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: `"Support" ${process.env.USER}`,
    to: newUser.email,
    subject: "Invitation à rejoindre le projet",
    html: `
              <p>Bonjour,</p>
              <p>Vous avez été invité à rejoindre le projet  en tant que ${newUser.role}.
                Cliquez sur le bouton ci-dessous pour accepter l’invitation :</p>
              <a href="${link}">Accepter l'invitation</a>
              <p>Ce lien est valable pendant 48 heures. Si vous n’avez pas demandé cette invitation, vous pouvez l’ignorer.</p>
              <p>Merci,</p>
              <p>L'équipe GPC</p>
            `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de réinitialisation envoyé avec succès !");
  } catch (error) {
    console.log("Erreur lors de l'envoi de l'email :", error);
  }
};

module.exports = sendEmail;
