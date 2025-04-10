const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../mongoDB/db.js");
const User = require("../models/User");
const upload = require("../middlewares/images");
const emailjs = require("emailjs-com");
const nodemailer = require("nodemailer");
const {authentification,collaboratorAuth,adminAuth} = require("../middlewares/auth.js");

connection();

router.get("/", collaboratorAuth, async (req, res) => {
  res.status(200).json("Bienvenue dans mon application...");
});

router.post("/logup", upload.single("photoProfil"), async (req, res) => {
  const { nom, prenom, username, tel, email, password, role, photoProfile } =
    req.body;
  const findUser = await User.findOne({ email: email });
  if (!req.file) {
    console.log(role);
    return res.status(400).json({ error: "Aucun fichier n'a été envoyé" });
  }
  if (findUser) {
    res.status(400).json("Cet utilisateur existe déjà...");
  } else {
    const hashedPassword = await bcrypt
      .hash(password, 10)
      .then((hashed) => {
        return hashed;
      })
      .catch((error) => {
        throw new Error(error);
      });
    const photoProfil = req.file ? req.file.filename : null;
    console.log(photoProfil);
    try {
      const user = await User.create({
        nom,
        prenom,
        username,
        tel,
        email,
        password: hashedPassword,
        role,
        photoProfil: photoProfil,
      });
      res.status(201).json({ "Utilisateur crée avec succès": user });
    } catch (error) {
      res.status(500).json({ "Une erreur est survenue": error });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    try {
      const isSamePassword = await bcrypt
        .compare(password, findUser.password)
        .then((isSame) => {
          return isSame;
        });

      if (isSamePassword) {
        const authToken = await jwt.sign(
          {
            email: findUser.email,
          },
          process.env.SECRET_TOKEN,
          { expiresIn: "1h" }
        );

        findUser.authTokens.push({ authToken });
        findUser.save();
        res.status(200).json({ result: "connexion reussie", data: {id: findUser._id, nom: findUser.nom, prenom: findUser.prenom, UserName: findUser.username, email: findUser.email}, token: authToken });
      } else {
        throw new Error("Une erreur est survenue...");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("Utilisateur introuvable...");
  }
});

router.post("/update-account", collaboratorAuth ,async (req, res) => {
  const { username, tel, email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10).then((hashed) => {
        return hashed;
      });
      findUser.username = username;
      findUser.telephone = tel;
      findUser.password = hashedPassword;
      findUser.save();
      res.status(200).json({ "compte modifié avec succès": findUser });
    } catch (error) {
      res.status(500).json({ "Une erreur est survenue...": error });
    }
  } else {
    res.status(500).json("Utilisateur introuvable...");
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    authToken = jwt.sign(
      { email: findUser.email },
      process.env.PASSWORD_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    findUser.authTokens.push({ authToken });
    findUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const sendEmail = async (email, name, resetLink) => {
      const mailOptions = {
        from: `"Support" ${process.env.USER}`,
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        html: `
          <p>Bonjour ${name},</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous :</p>
          <a href="${resetLink}">Réinitialiser mon mot de passe</a>
          <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Email de réinitialisation envoyé avec succès !');
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
      }

    };

    const link = `http://localhost:5173/resetpassword/${authToken}`;
    sendEmail(findUser.email,findUser.nom, link);
    return res.status(200).send("Vérifiez votre boite mail");
  } else {
    return res.status(400).send("Compte introuvable");
  }
});

router.post("/set-new-password", authentification, async (req,res)=>{ 
  const new_password = req.body.password
  const user = req.user 
  const password_hashed = await bcrypt.hash(new_password,10).then(hashed=>{
    return hashed
  })
  user.password = password_hashed
  user.save()
  res.status(200).json("Mot de passe réinitialisé avec succès")
})

module.exports = router;
