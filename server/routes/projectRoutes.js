const router = require("express").Router();
const mongoose = require("mongoose");
const project = require("../models/project");
const GuestUser = require("../models/guestUser.js");
const User = require("../models/user.js");
const task = require("../models/task");
const {
  collaboratorAuth,
  adminAuth,
  userInviteAuth,
} = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");
const sendEmail = require("../Utils/sendMail.js");

//Get all project by User
router.post("/project/:id", collaboratorAuth, async (req, res) => {
  const userId = req.params.id;
  const getProjectAll = await project.aggregate([
    {
      $match: {
        $or: [
          { owners: { $in: [new mongoose.Types.ObjectId(userId)] } },
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
     owners: [userId],
  });
  await newproject.save();
  return res.status(201).json({ message: "new project created " });
});

// Middleware pour vérifier les permissions
async function checkProjectOwnership(req, res, next) {
  const userId = req.params.id;
  const projectID = req.params.idproject;
  const projectC = await project.findOne({
    _id: projectID,
    owners: { $in: { userId } },
  });
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
  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId("6804d0b4074c5605a5d2f5d6"),
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

router.post("/projet/users", async (req, res) => {
  const usersIds = req.body;
  try {
    const users = await User.find({ _id: { $in: usersIds } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Inviter un membre au projet, si il accepte on l'ajoute.
router.post(
  "/projet/:idproject/adduser/:id",
  checkProjectOwnership,
  async (req, res) => {
    const projectId = req.params.idproject;
    const adminId = req.params.adminId;
    const { newUserEmail, role } = req.body;

    try {
      const authToken = await jwt.sign(
        { email: newUserEmail },
        process.env.SECRET_TOKEN,
        { expiresIn: "48h" }
      );

      const findUser = await User.findOne({ email: newUserEmail });
      if (findUser) {
        const memberExists = await project.findOne({
          _id: projectId,
          menbres: new mongoose.Types.ObjectId(findUser._id),
        });
        if (memberExists) {
          return res
            .status(400)
            .json({ message: "Le membre existe déjà dans le projet" });
        } else {
          const newUser = await GuestUser.create({
            project_Id: new mongoose.Types.ObjectId(projectId),
            email: newUserEmail,
            role,
          });
          newUser.authTokens.push({ authToken });
          newUser.save();

          const link = `http://localhost:5173/logup/${authToken}`;
          sendEmail(newUser, link);
          res.status(200).json({ message: "Membre ajouté au projet" });
        }
      } else {
        const isExists = await GuestUser.findOne({
          email: newUserEmail,
        });

        if (!isExists) {
          const newUser = await GuestUser.create({
            project_Id: new mongoose.Types.ObjectId(projectId),
            email: newUserEmail,
            role,
          });
          newUser.authTokens.push({ authToken });

          newUser.save();

          const link = `http://localhost:5173/logup/${authToken}`;
          sendEmail(newUser, link);
          res.status(200).json({ message: "Membre ajouté au projet" });
        } else {
          res
            .status(400)
            .json({ message: "Le membre existe déjà dans le projet" });
        }
      }
    } catch (error) {
      console.log("first2");
      res.status(500).json(error);
    }
  }
);
router.get(
  "/project/users/finduserinvite",
  userInviteAuth,
  async (req, res) => {
    const guestUser = req.user;
    try {
      const findUser = await User.findOne({ email: guestUser.email });
      if (findUser) {
        if (guestUser.role === "admin") {
          await project.updateOne(
            { _id: new mongoose.Types.ObjectId(guestUser.project_Id) },
            {
              $addToSet: { menbres: new mongoose.Types.ObjectId(findUser.id) },
              $push: { owners: new mongoose.Types.ObjectId(findUser.id) },
            }
          );
        } else {
          await project.updateOne(
            { _id: new mongoose.Types.ObjectId(guestUser.project_Id) },
            { $addToSet: { menbres: new mongoose.Types.ObjectId(findUser.id) } }
          );
        }
        await GuestUser.deleteOne({ email: guestUser.email });
        res.status(200).json(findUser);
      } else {
        res.status(400).json(guestUser);
      }
    } catch (error) {}
  }
);
// ********************************************************************** //

// Supprimer un membre du projet
router.post(
  "/projet/:idproject/deleteuser/:id",
  checkProjectOwnership,
  async (req, res) => {
    const projectId = req.params.idproject;
    const userId = req.body.userId;
    try {
      const deleteUser = await project.updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $pull: { menbres: new mongoose.Types.ObjectId(userId) } }
      );
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  "/projet/:idproject/setToAdmin/:id",
  checkProjectOwnership,
  async (req, res) => {
    const projectId = req.params.idproject;
    const userId = req.body.userId;
    try {
      const updateuser = await project.updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $addToSet: { owners: new mongoose.Types.ObjectId(userId) } }
      );
      res.status(200).json(updateuser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post("/new-notification", async (req, res) => {
  const idProject = req.body.idProject;
  const notifType = req.body.type;
  const message = req.body.message;
  try {
    const findProject = await project.findOne({
      _id: new mongoose.Types.ObjectId(idProject),
    });
    if (project) {
      findProject.notifications.push({
        notification: {
          type: notifType,
          message: message,
          isvew: false,
        },
      });
      await findProject.save();
    }
  } catch (error) {
    res.status(500).json(error);
  }
  res.status(200).json("users");
});

router.get("/notifications/:userId", async (req, res) => {
  const userId = req.params.userId;
  const notifs = await User.findOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    { _id: 0, notifications: 1 }
  );
  res.status(200).json({ notifs: notifs });
});

module.exports = router;
