const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../mongoDB/db.js");
const User = require("../models/User");

connection();

router.get("/", async (req, res) => {
  res.status(200).json("Bienvenue dans mon application...");
});

router.post("/logup", async (req, res) => {
  const { nom, prenom, username, tel, email, password, role } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    res.status(400).json("Cet utilisateur existe déjà...");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10).then((hashed) => {
      return hashed;
    });
    try {
      const user = await User.create({
        nom,
        prenom,
        username,
        tel,
        email,
        password: hashedPassword,
        role,
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
        )

        findUser.authTokens.push({authToken})
        findUser.save()
        res.status(200).json({result: "connexion reussie", token: authToken})
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

router.post("/update-account", async (req,res)=>{
    const { username, tel, email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if(findUser){
        try {
            const hashedPassword = await bcrypt.hash(password, 10).then((hashed) => {
                return hashed
            })
            findUser.username = username
            findUser.telephone = tel
            findUser.password = hashedPassword
            findUser.save()
            res.status(200).json({"compte modifié avec succès": findUser})
        } catch (error) {
            res.status(500).json({"Une erreur est survenue...": error})
        }
    }else{
        res.status(500).json("Utilisateur introuvable...")
    }
})

module.exports = router;
