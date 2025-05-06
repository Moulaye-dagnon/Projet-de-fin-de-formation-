const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connection à la base de données reussie pour le remplissage des données !");
  mongoose.connection.once('open', seedDatabase); // Exécute seedDatabase après l'établissement de la connexion
})
.catch((err) => {
  console.error("Erreur de connexion à la base de données :", err);
});

const users = [
  {
    nom: "Dupont",
    prenom: "Jean",
    username: "jdupont",
    telephone: "0612345678",
    email: "jean.dupont@example.com",
    password: "password123",
    role: "admin",
  },
  {
    nom: "Martin",
    prenom: "Marie",
    username: "mmartin",
    telephone: "0698765432",
    email: "marie.martin@example.com",
    password: "password123",
    role: "collaborateur",
  },
  {
    nom: "Bernard",
    prenom: "Paul",
    username: "pbernard",
    telephone: "0623456789",
    email: "paul.bernard@example.com",
    password: "password123",
    role: "collaborateur",
  },
  {
    nom: "Durand",
    prenom: "Sophie",
    username: "sdurand",
    telephone: "0634567890",
    email: "sophie.durand@example.com",
    password: "password123",
    role: "admin",
  },
  {
    nom: "Lefevre",
    prenom: "Luc",
    username: "llefevre",
    telephone: "0645678901",
    email: "luc.lefevre@example.com",
    password: "password123",
    role: "collaborateur",
  },
  {
    nom: "Moreau",
    prenom: "Julie",
    username: "jmoreau",
    telephone: "0656789012",
    email: "julie.moreau@example.com",
    password: "password123",
    role: "collaborateur",
  },
  {
    nom: "Roux",
    prenom: "Pierre",
    username: "proux",
    telephone: "0667890123",
    email: "pierre.roux@example.com",
    password: "password123",
    role: "admin",
  },
  {
    nom: "Blanc",
    prenom: "Claire",
    username: "cblanc",
    telephone: "0678901234",
    email: "claire.blanc@example.com",
    password: "password123",
    role: "collaborateur",
  },
];

const projects = [
  {
    name: "Projet Alpha",
    description: "Description du projet Alpha",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Beta",
    description: "Description du projet Beta",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Gamma",
    description: "Description du projet Gamma",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Delta",
    description: "Description du projet Delta",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Epsilon",
    description: "Description du projet Epsilon",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Zeta",
    description: "Description du projet Zeta",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Eta",
    description: "Description du projet Eta",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Theta",
    description: "Description du projet Theta",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Iota",
    description: "Description du projet Iota",
    owner: null, // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
];

const tasks = [
  {
    name: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    priority: "medium",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    priority: "high",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    priority: "low",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 4",
    description: "Description de la tâche 4",
    status: "todo",
    priority: "medium",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 5",
    description: "Description de la tâche 5",
    status: "doing",
    priority: "high",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 6",
    description: "Description de la tâche 6",
    status: "done",
    priority: "low",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 7",
    description: "Description de la tâche 7",
    status: "todo",
    priority: "medium",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
  {
    name: "Tâche 8",
    description: "Description de la tâche 8",
    status: "doing",
    priority: "high",
    assignTo: null, // sera mis à jour après la création des utilisateurs
    project: null, // sera mis à jour après la création des projets
    dueDate: new Date(),
    files: [],
  },
];

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({}); // Assurez-vous que Task est correctement défini et importé

    const createdUsers = await User.insertMany(users);
    projects.forEach((project, index) => {
      project.owner = createdUsers[index % createdUsers.length]._id;
      project.menbres = createdUsers.map(user => user._id);
    });

    const createdProjects = await Project.insertMany(projects);
    tasks.forEach((task, index) => {
      task.assignTo = createdUsers[index % createdUsers.length]._id;
      task.project = createdProjects[index % createdProjects.length]._id;
    });

    await Task.insertMany(tasks);

    console.log("Base de données remplie avec succès !");
    mongoose.connection.close();
  } catch (error) {
    console.error("Erreur lors du remplissage de la base de données :", error);
  }

}

seedDatabase();
