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
const cloudinary = require("../Utils/cloudinaryConfig.js");
connection();

router.get("/me", collaboratorAuth, async (req, res) => {
  const user = req.user;
  const data = {
    id: user._id,
    nom: user.nom,
    prenom: user.prenom,
    UserName: user.username,
    email: user.email,
    photoProfil: user.photoProfil,
    newNotif: user.notifications,
  };
  console.log("sorti");

  res.status(200).json(data);
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
  try {
    const { nom, prenom, username, tel, email, password, poste } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(409).json({ error: "Cet utilisateur existe déjà..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let photoProfil = null;

    if (req.file) {
      try {
        const cloudinaryUploadResponse = await new Promise(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "user_profiles", resource_type: "auto" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            stream.end(req.file.buffer);
          }
        );
        photoProfil = {
          public_id: cloudinaryUploadResponse.public_id,
          url: cloudinaryUploadResponse.secure_url,
        };
      } catch (uploadError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de l'upload Cloudinary" });
      }
    }

    const date = new Date();
    const user = await User.create({
      nom,
      prenom,
      username,
      telephone: tel,
      email,
      password: hashedPassword,
      poste,
      photoProfil,
      created_At: date,
    });

    return res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
});

router.post(
  "/logup/acceptInvitation/:token",
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
          { expiresIn: "1d" }
        );
        findUser.authTokens = [{ authToken }];
        findUser.last_connexion = date;
        findUser.save();
        res.cookie("token", authToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000,
        });

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

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Déconnecté avec succès" });
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
        // const photoProfil = req.file ? req.file.filename : null;
        let photoProfil = null;
        if (req.file) {
          try {
            const cloudinaryUploadResponse = await new Promise(
              (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: "user_profiles", resource_type: "auto" },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                  }
                );
                stream.end(req.file.buffer);
              }
            );
            photoProfil = {
              public_id: cloudinaryUploadResponse.public_id,
              url: cloudinaryUploadResponse.secure_url,
            };
          } catch (uploadError) {
            return res
              .status(500)
              .json({ error: "Erreur lors de l'upload Cloudinary" });
          }
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
    sendMessage(nom, prenom, email, objet, message);
    res.status(200).json({ succes: "Message envoyé!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
