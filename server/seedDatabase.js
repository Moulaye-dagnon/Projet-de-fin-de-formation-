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
    "nom": "Diaby",
    "prenom": "Cheickna",
    "username": "cheickna01",
    "telephone": "+22370000001",
    "email": "cheickna@example.com",
    "password": "hashedpassword1",
    "role": "admin",
    "poste": "Chef de projet",
    "photoProfil": "https://example.com/profil1.jpg",
    "created_At": "2025-01-01T08:00:00Z",
    "last_connexion": "2025-04-28T10:00:00Z"
  },
  {
    "nom": "Traoré",
    "prenom": "Fatoumata",
    "username": "fatou_dev",
    "telephone": "+22370000002",
    "email": "fatou@example.com",
    "password": "hashedpassword2",
    "role": "collaborateur",
    "poste": "Développeuse front-end",
    "photoProfil": "https://example.com/profil2.jpg",
    "created_At": "2025-01-05T09:30:00Z",
    "last_connexion": "2025-04-28T09:00:00Z"
  },
  {
    "nom": "Konaté",
    "prenom": "Ibrahim",
    "username": "ibrahim_kon",
    "telephone": "+22370000003",
    "email": "ibrahim@example.com",
    "password": "hashedpassword3",
    "role": "collaborateur",
    "poste": "Designer UX",
    "photoProfil": "",
    "created_At": "2025-01-10T07:15:00Z",
    "last_connexion": "2025-04-27T12:45:00Z"
  },
  {
    "nom": "Cissé",
    "prenom": "Mariam",
    "username": "mariamc",
    "telephone": "+22370000004",
    "email": "mariam@example.com",
    "password": "hashedpassword4",
    "role": "collaborateur",
    "poste": "Testeuse QA",
    "photoProfil": "https://example.com/profil3.jpg",
    "created_At": "2025-02-01T10:20:00Z",
    "last_connexion": "2025-04-26T15:00:00Z"
  },
  {
    "nom": "Keita",
    "prenom": "Oumar",
    "username": "oumar_k",
    "telephone": "+22370000005",
    "email": "oumar@example.com",
    "password": "hashedpassword5",
    "role": "collaborateur",
    "poste": "Développeur backend",
    "photoProfil": "",
    "created_At": "2025-02-15T14:10:00Z",
    "last_connexion": "2025-04-28T13:22:00Z"
  },
  {
    "nom": "Camara",
    "prenom": "Awa",
    "username": "awa_design",
    "telephone": "+22370000006",
    "email": "awa@example.com",
    "password": "hashedpassword6",
    "role": "collaborateur",
    "poste": "Graphiste",
    "photoProfil": "https://example.com/profil4.jpg",
    "created_At": "2025-03-01T11:45:00Z",
    "last_connexion": "2025-04-25T18:30:00Z"
  },
  {
    "nom": "Sangaré",
    "prenom": "Boubacar",
    "username": "boubacar_s",
    "telephone": "+22370000007",
    "email": "boubacar@example.com",
    "password": "hashedpassword7",
    "role": "collaborateur",
    "poste": "Scrum Master",
    "photoProfil": "",
    "created_At": "2025-03-10T12:30:00Z",
    "last_connexion": "2025-04-28T07:15:00Z"
  },
  {
    "nom": "Sidibé",
    "prenom": "Aminata",
    "username": "amina_s",
    "telephone": "+22370000008",
    "email": "aminata@example.com",
    "password": "hashedpassword8",
    "role": "collaborateur",
    "poste": "Product Owner",
    "photoProfil": "https://example.com/profil5.jpg",    "created_At": "2025-03-15T16:00:00Z",
    "last_connexion": "2025-04-28T10:45:00Z"
  }
];

const projects = [
  {
    name: "Projet Alpha",
    description: "Description du projet Alpha",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Beta",
    description: "Description du projet Beta",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Gamma",
    description: "Description du projet Gamma",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Delta",
    description: "Description du projet Delta",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Epsilon",
    description: "Description du projet Epsilon",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Zeta",
    description: "Description du projet Zeta",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Eta",
    description: "Description du projet Eta",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Theta",
    description: "Description du projet Theta",
    owners: [], // sera mis à jour après la création des utilisateurs
    menbres: [],
  },
  {
    name: "Projet Iota",
    description: "Description du projet Iota",
    owners: [], // sera mis à jour après la création des utilisateurs
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
      project.owners.push(createdUsers[index % createdUsers.length]._id)
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

seedDatabase()