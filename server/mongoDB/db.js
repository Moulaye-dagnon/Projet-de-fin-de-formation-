const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  const uri = process.env.MONGO_URI;

  try {
    mongoose.connect(uri)
    .then(() => {
      console.log("Connexion à la base de données réussie !!!");
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion à la base de données :", error);
    });
  } catch (error) {
    console.error("Erreur inattendue :", error);
  }
};

module.exports = connection;