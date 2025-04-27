const router = require("express").Router();
const mongoose = require("mongoose");
const project = require("../models/project");
const User = require("../models/User");
const task = require("../models/task");
const { collaboratorAuth } = require("../middlewares/auth");

//Get all project by User
router.post("/project/:id", collaboratorAuth, async (req, res) => {
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
router.post("/project/:id/new", collaboratorAuth, async (req, res) => {
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

// Route pour récupérer toutes les tâches d'un projet, classées par statut, et les informations du projet
router.get("/tasks/project/:projectId", collaboratorAuth, async (req, res) => {
  const projectId = req.params.projectId;
  try {
    // Récupérer les informations du projet
    const projectC = await project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    // Récupérer les tâches du projet, classées par statut
    const tasks = await task.aggregate([
      {
        $match: {
          project: new mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: "$status",
          tasks: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              priority: "$priority",
              dueDate: "$dueDate",
              files: "$files",
              assignTo: "$assignTo",
            },
          },
        },
      },
    ]);
    
    // Retourner les informations du projet et les tâches
    return res.status(200).json({ projectC, tasks });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tâches et des informations du projet :",
      error
    );
    return res.status(500).json({
      message:
        "Erreur lors de la récupération des tâches et des informations du projet",
      error,
    });
  }
});

router.post("/projet/users", async (req, res) => {
  const usersIds = req.body;
  try {
    const users = await User.find({ _id: { $in: usersIds } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;                    
