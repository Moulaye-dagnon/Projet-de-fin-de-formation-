const mongoose = require("mongoose");
const project = require("../models/project");
async function checkProjectCreator(req, res, next) {
  const userId = req.params.id;
  const projectID = req.params.idproject;
  try {
    const projectC = await project.findOne({
      _id: projectID,
      superAdmin: new mongoose.Types.ObjectId(userId),
    });

    if (!projectC) {
      return res.status(401).json({
        message: "L'utilisateur n'a pas le droit d'ajouter à ce projet",
      });
    }
    next();
  } catch (error) {
    console.error("error server", error);
    res.status(500).json({
      message: "erro serveur",
    });
  }
}

module.exports = checkProjectCreator;
