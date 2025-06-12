const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connection à la base de données reussie!!!");
  } catch (error) {
    console.log("erreur lors de la connexion à la base de donnée...");
  }
};

module.exports = connection;
