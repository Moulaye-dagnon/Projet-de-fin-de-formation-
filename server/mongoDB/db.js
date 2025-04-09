const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/gestion-de-projet");
    console.log("Connection à la base de données reussie!!!");
  } catch (error) {
    console.log("erreur lors de la connexion à la base de donnée...");
  }
};

module.exports = connection;
