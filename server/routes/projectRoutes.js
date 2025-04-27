const router = require("express").Router();
const mongoose = require("mongoose");
const project = require("../models/project");
const User = require("../models/user");
const task = require("../models/task");

//Get all project by User
router.post("/project/:id", async (req, res) => {
  const userId = req.params.id;
  const getProjectAll = await project.aggregate([
    {
      $match: {
        $or: [
          { owner: new mongoose.Types.ObjectId(userId) },
          { menbres: { $in: [new mongoose.Types.ObjectId(userId)] } },
        ],
      },
    },
  ]);
  return res.status(200).json(getProjectAll);
});

//create new projet
router.post("/project/:id/new", async (req, res) => {
  const userId = req.params.id;
  const { name, description } = req.body;
  const newproject = new project({
    name,
    description,
    owner: userId,
  });
  await newproject.save();
  return res.status(201).json({ message: "new project created " });
});

// Middleware pour vérifier les permissions
async function checkProjectOwnership(req, res, next) {
  const userId = req.params.id;
  const projectID = req.params.idproject;
  const projectC = await project.findOne({ _id: projectID, owner: userId });
  if (!projectC) {
    return res.status(401).json({
      message: "L'utilisateur n'a pas le droit d'ajouter à ce projet",
    });
  }
  req.project = projectC;
  next();
}

// Ajouter un nouveau membre au projet
router.post(
  "/project/:id/:idproject/new/menbre",
  checkProjectOwnership,
  async (req, res) => {
    try {
      const { membreId } = req.body;
      if (!membreId) {
        return res.status(400).json({ message: "membreId est requis" });
      }

      const memberExists = await project.findOne({
        _id: req.params.idproject,
        menbres: new mongoose.Types.ObjectId(membreId),
      });

      if (memberExists) {
        return res
          .status(400)
          .json({ message: "Le membre existe déjà dans le projet" });
      }
      await project.updateOne(
        { _id: new mongoose.Types.ObjectId(req.params.idproject) },
        { $addToSet: { menbres: new mongoose.Types.ObjectId(membreId) } }
      );
      return res.status(200).json({ message: "Membre ajouté au projet" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre :", error);

      return res
        .status(500)
        .json({ message: "Erreur lors de l'ajout du membre", error });
    }
  }
);

router.get("/project/:projectId/membre", async (req, res) => {
  const projectID = req.params.projectId;

  const projectC = await project.findOne({ _id: projectID });
  if (!projectC) {
    return res.status(401).json({
      message: "Ce project n'existe pas",
    });
  }
  console.log(projectC);
  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId("6804d0b4074c5605a5d2f5d7"),
  });
  console.log(user);
  try {
    // const Membres = await project.aggregate([
    // 	{
    // 	  $match: { _id: new mongoose.Types.ObjectId(projectID) }
    // 	},
    // 	{
    // 	  $lookup: {
    // 		from: "users",
    // 		localField: "menbres",
    // 		foreignField: "_id",
    // 		as: "membresInfo",
    // 	  },
    // 	},
    // 	{
    // 	  $unwind: "$membresInfo",
    // 	},
    // 	{
    // 	  $project: {
    // 		_id: "$membresInfo._id",
    // 		nom: "$membresInfo.nom",
    // 		prenom: "$membresInfo.prenom",
    // 		email: "$membresInfo.email",
    // 		username: "$membresInfo.username",
    // 		telephone: "$membresInfo.telephone",
    // 		role: "$membresInfo.role",
    // 		photoProfil: "$membresInfo.photoProfil",
    // 	  },
    // 	}
    //   ]);
    const membresInfos = await Promise.all(
      projectC.menbres.map(async (membreId) => {
        const membre = await User.findById(membreId);
        // console.log(membre);
      })
    );
    // console.log(membresInfos);

    res.status(200).json(membresInfos);
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des membres", error });
  }
});

module.exports = router;
