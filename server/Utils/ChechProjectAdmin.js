const mongoose = require("mongoose");
const project = require("../models/project");
async function checkProjectAminship(req, res, next) {
  const userId = req.params.id;
  const projectID = req.params.idproject;
  const projectC = await project.findOne({
    _id: projectID,
    owners: { $in: [new mongoose.Types.ObjectId(userId)] },
  });
  if (!projectC) {
    return res.status(401).json({
      message: "L'utilisateur n'a pas le droit d'ajouter à ce projet",
    });
  }
  next();
}

module.exports = checkProjectAminship;
