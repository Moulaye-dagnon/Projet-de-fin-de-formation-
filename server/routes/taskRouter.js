const router = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/task");
const Project = require("../models/project");

// Route pour créer une nouvelle tâche
router.post("/task/:userId/new", async (req, res) => {
  const userId = req.params.userId;
  const { projectId, name, description, assignToId,status, priority, dueDate, files } =
    req.body;

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

  const newTask = new Task({
    name,
    description,
    status: status || "todo",
    priority: priority || "medium",
    assignTo: new mongoose.Types.ObjectId(assignToId),
    project: new mongoose.Types.ObjectId(project._id),
    dueDate: dueDate ? new Date(dueDate) : null,
    files: files || [],
  });
  await newTask.save();
  return res
    .status(201)
    .json({ message: "Nouvelle tâche créée", task: newTask });
});

// Route pour mettre à jour le statut d'une tâche
router.put("/task/:id/:userId/status", async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.id;
  const { projectId, status } = req.body;

  const project = await Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
  });

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
  });
  if (!project) {
    return res.status(404).json({ message: "Ce projet n'existe pas" });
  }
  if (!task) {
    return res.status(404).json({ message: "Cette tâche n'existe pas" });
  }

  if (
    userId != project.owner.toString() &&
    userId != task.assignTo.toString()
  ) {
    return res.status(401).json({
      message:
        "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
    });
  }

  await Task.updateOne(
    { _id: new mongoose.Types.ObjectId(task._id) },
    { $set: { status } }
  );
  return res.status(200).json({ message: "Statut de la tâche mis à jour" });
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
	  return res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
	}
  });

module.exports = router;
