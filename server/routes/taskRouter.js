const router = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/task");
const Project = require("../models/project");
const task = require("../models/task");

// Route pour créer une nouvelle tâche
router.post("/task/:userId/new", async (req, res) => {
  const userId = req.params.userId;
  const {
    projectId,
    name,
    description,
    assignToId,
    status,
    priority,
    dueDate,
    files,
  } = req.body;

  const project = await Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    owner: new mongoose.Types.ObjectId(userId),
  });
  if (!project) {
    return res.status(404).json({
      message:
        "L'utilisateur n'a pas de projet dans lequel il a droit de création",
    });
  }
  const lastTask = await Task.findOne({
    project: projectId,
  }).sort({ order: -1 });
  const newOrder = lastTask ? lastTask.order + 1 : 0;

  const newTask = new Task({
    name,
    description,
    status: status || "todo",
    priority: priority || "medium",
    assignTo: new mongoose.Types.ObjectId(assignToId),
    order: newOrder,
    project: new mongoose.Types.ObjectId(project._id),
    dueDate: dueDate ? new Date(dueDate) : null,
    files: files || [],
  });
  await newTask.save();
  return res
    .status(201)
    .json({ message: "Nouvelle tâche créée", task: newTask });
});

router.patch("/task/reorder/:userid", async (req, res) => {
  const { userId } = req.params;
  const { tasks, projectId } = req.body;
  const project = Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    $or: [
      { owner: new mongoose.Types.ObjectId(userId) },
      { menbres: new mongoose.Types.ObjectId(userId) },
    ],
  });
  if (!project) {
    return res.status(401).json({
      message: "Vous n'avez pas les droits nécessaires sur ce projet",
    });
  }
  try {
    await Promise.all(
      await tasks.map(async (task) => {
        await Task.findByIdAndUpdate(
          new mongoose.Types.ObjectId(task._id),
          { status: task.status, priority: task.priority },
          { new: true }
        );
      })
    );
    return res.status(200).json({ message: "Tâches réorganisées par priorite" });
  } catch (error) {
    console.error("Erreur lors de la réorganisation des tâches :", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route pour supprimer une tâche
router.delete("/task/:id/:userId", async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.id;
  const { projectId } = req.body;

  const project = await Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    owner: new mongoose.Types.ObjectId(userId),
  });

  if (!project) {
    return res.status(401).json({
      message: "Vous n'avez pas les droits nécessaires sur ce projet",
    });
  }

  await Task.deleteOne({
    _id: new mongoose.Types.ObjectId(taskId),
  });
  return res.status(200).json({ message: "Tâche supprimée" });
});

// Route pour recuperer tout les taches d'un utilisateur par projet
router.get("/tasks/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await Task.aggregate([
      {
        $match: {
          assignTo: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$project",
          tasks: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              status: "$status",
              priority: "$priority",
              dueDate: "$dueDate",
              files: "$files",
            },
          },
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $unwind: "$project",
      },
      {
        $group: {
          _id: "$project._id",
          projectName: { $first: "$project.name" },
          tasksByStatus: {
            $push: {
              status: "$tasks.status",
              tasks: "$tasks",
            },
          },
        },
      },
    ]);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches", error });
  }
});

// Route pour récupérer toutes les tâches d'un projet, classées par statut, et les informations du projet
router.get("/tasks/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    const tasks = await Task.aggregate([
      {
        $match: {
          project: new mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $sort: { order: 1 },
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
              order: "$order",
            },
          },
        },
      },
    ]);

    // Retourner les informations du projet et les tâches
    return res.status(200).json({ Project, tasks });
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

router.post("/tasks/projecttaskbyuser", async (req, res) => {
  const { projet_id, user_id } = req.body;
  try {
    const tasks = await task.aggregate([
      {
        $match: {
          project: new mongoose.Types.ObjectId(projet_id),
          assignTo: new mongoose.Types.ObjectId(user_id),
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
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ "erreur: ": error });
  }
});
module.exports = router;
