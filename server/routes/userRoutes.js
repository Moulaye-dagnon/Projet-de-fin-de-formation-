const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../mongoDB/db.js");
const User = require("../models/user.js");
const project = require("../models/project.js");
const GuestUser = require("../models/guestUser.js");
const upload = require("../middlewares/images");
const emailjs = require("emailjs-com");
const nodemailer = require("nodemailer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const {
  authentification,
  collaboratorAuth,
  adminAuth,
  userInviteAuth,
  isMember,
} = require("../middlewares/auth.js");
const { sendMessage } = require("../Utils/sendMessage.js");

connection();

router.get("/:projectID", async (req, res) => { 
  const user = req.user
  res.status(200).json(user);
});
 
router.get("/users/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ "Une erreur est survenue:": error });
  }
});

router.post("/logup", upload.single("photoProfil"), async (req, res) => {
  const { nom, prenom, username, tel, email, password, poste, photoProfile } =
    req.body;
  const findUser = await User.findOne({ email: email });

  if (findUser) {
    res.status(409).json("Cet utilisateur existe déjà...");
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
    const date = new Date();
    try {
      const user = await User.create({
        nom,
        prenom,
        username,
        telephone: tel,
        email,
        password: hashedPassword,
        poste,
        photoProfil: photoProfil,
        created_At: date,
      });
      res.status(201).json({ "Utilisateur crée avec succès": user });
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  }
});

router.post(
  "/logup/acceptInvitation",
  userInviteAuth,
  upload.single("photoProfil"),
  async (req, res) => {
    const {
      nom,
      prenom,
      username,
      tel,
      email,
      password,
      role,
      poste,
      photoProfile,
    } = req.body;
    const guestUser = req.user;
    const hashedPassword = await bcrypt
      .hash(password, 10)
      .then((hashed) => {
        return hashed;
      })
      .catch((error) => {
        throw new Error(error);
      });
    const photoProfil = req.file ? req.file.filename : null;
    const date = new Date();
    try {
      const user = await User.create({
        nom,
        prenom,
        username,
        telephone: tel,
        email,
        password: hashedPassword,
        role,
        poste,
        photoProfil: photoProfil,
        created_At: date,
      });
      if (guestUser.role === "admin") {
        await project.updateOne(
          { _id: new mongoose.Types.ObjectId(guestUser.project_Id) },
          {
            $addToSet: { menbres: new mongoose.Types.ObjectId(user.id) },
            $push: { owners: new mongoose.Types.ObjectId(user.id) },
          }
        );
      } else {
        await project.updateOne(
          { _id: new mongoose.Types.ObjectId(guestUser.project_Id) },
          { $addToSet: { menbres: new mongoose.Types.ObjectId(user.id) } }
        );
      }

      await GuestUser.deleteOne({ email: guestUser.email });
      res.status(201).json({ "Utilisateur crée avec succès": user });
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  const date = new Date();
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
            _id: findUser._id,
            email: findUser.email,
            connected_at: date,
          },
          process.env.SECRET_TOKEN,
          { expiresIn: "24h" }
        );
        findUser.authTokens.pop();
        findUser.authTokens.push({ authToken });
        findUser.last_connexion = date;
        findUser.save();
        res.status(200).json({
          result: "connexion reussie",
          data: {
            id: findUser._id,
            nom: findUser.nom,
            prenom: findUser.prenom,
            UserName: findUser.username,
            email: findUser.email,
            photoProfil: findUser.photoProfil,
            newNotif: findUser.notifications,
          },
          token: authToken,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(500).json({ "une erreur: ": error });
    }
  } else {
    res.status(409).json("Utilisateur introuvable...");
  }
});

router.post(
  "/update-account",
  upload.single("photoProfil"),
  async (req, res) => {
    const { nom, prenom, email, username, password, role, poste, telephone } =
      req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      try {
        let hashedPassword;
        if (password && password !== "") {
          hashedPassword = await bcrypt.hash(password, 10).then((hashed) => {
            return hashed;
          });
          findUser.password = hashedPassword;
        }

        const photoProfil = req.file ? req.file.filename : null;
        if (photoProfil) {
          console.log(photoProfil);
          findUser.photoProfil = photoProfil;
        }
        findUser.username = username;
        findUser.nom = nom;
        findUser.prenom = prenom;
        findUser.email = email;
        findUser.role = role;
        findUser.poste = poste;
        findUser.telephone = telephone;
        findUser.save();
        res.status(200).json({ "compte modifié avec succès": findUser });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(500).json("Utilisateur introuvable...");
    }
  }
);

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
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
          console.log("Email de réinitialisation envoyé avec succès !");
        } catch (error) {
          console.log("Erreur lors de l'envoi de l'email :", error);
        }
      };

      const link = `http://localhost:5173/resetpassword/${authToken}`;
      sendEmail(findUser.email, findUser.nom, link);
      return res.status(200).send({ email: email });
    } else {
      return res.status(409).send({ email: email });
    }
  } catch (error) {
    return res.status(500).send({ email: email });
  }
});

router.post("/set-new-password", authentification, async (req, res) => {
  const new_password = req.body.password;
  const user = req.user;
  const password_hashed = await bcrypt.hash(new_password, 10).then((hashed) => {
    return hashed;
  });
  user.password = password_hashed;
  user.save();
  res.status(200).json("Mot de passe réinitialisé avec succès");
});

router.post("/contactus", async (req, res) => {
  const { nom, prenom, email, objet, message } = req.body;
  try {
    sendMessage(nom, prenom, email, objet, message)
    res.status(200).json({ succes: "Message envoyé!" });
  } catch (error) {
      console.log(error)
    res.status(500).json(error);
  }
});      

module.exports = router;
