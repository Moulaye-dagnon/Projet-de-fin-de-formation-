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
  isMember,
} = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");
const sendEmail = require("../Utils/sendMail.js");
const checkProjectAminship = require("../Utils/ChechProjectAdmin.js");
const checkProjectCreator = require("../Utils/checkProjectCreator.js");
//Get all project by User
router.post("/project/:id", async (req, res) => {
  const userId = req.params.id;
  const getProjectAll = await project.aggregate([
    {
      $match: {
        $or: [
          { owners: new mongoose.Types.ObjectId(userId) },
          { menbres: new mongoose.Types.ObjectId(userId) },
        ],
      },
    },
  ]);
  return res.status(200).json(getProjectAll);
});

//create new projet
router.post("/project/:id/new", collaboratorAuth, async (req, res) => {
  const userId = req.params.id;
  const { name, description,date } = req.body;
  const newproject = new project({
    name,
    description,
    dueDate: date,
    superAdmin: new mongoose.Types.ObjectId(userId),
  });
  newproject.menbres.push(new mongoose.Types.ObjectId(userId));
  newproject.owners.push(new mongoose.Types.ObjectId(userId));
  await newproject.save();
  return res.status(201).json({ message: "new project created " });
});

// Middleware pour vérifier les permissions
// async function checkProjectAminship(req, res, next) {
//   const userId = req.params.id;
//   const projectID = req.params.idproject;
//   const projectC = await project.findOne({
//     _id: projectID,
//     owners: { $in: [new mongoose.Schema.Types.ObjectId(userId)] },
//   });
//   if (!projectC) {
//     return res.status(401).json({
//       message: "L'utilisateur n'a pas le droit d'ajouter à ce projet",
//     });
//   }
//   req.project = projectC;
//   next();
// }

// Ajouter un nouveau membre au projet
router.post(
  "/project/:id/:idproject/new/menbre",
  checkProjectAminship,
  async (req, res) => {
    try {
      const { membreId } = req.body;
      if (!membreId) {
        return res.status(400).json({ message: "membreId est requis" });
      }

      const memberExists = await project.findOne({
        _id: req.params.idproject,
        menbres: { $in: [new mongoose.Types.ObjectId(membreId)] },
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

// router.get("/project/:projectId/membre", async (req, res) => {
//   const projectID = req.params.projectId;

//   const projectC = await project.findOne({ _id: projectID });
//   if (!projectC) {
//     return res.status(401).json({
//       message: "Ce project n'existe pas",
//     });
//   }
//   const user = await User.findOne({
//     _id: new mongoose.Types.ObjectId("6804d0b4074c5605a5d2f5d6"),
//   });
//   console.log(user);
//   try {
//     // const Membres = await project.aggregate([
//     // 	{
//     // 	  $match: { _id: new mongoose.Types.ObjectId(projectID) }
//     // 	},
//     // 	{
//     // 	  $lookup: {
//     // 		from: "users",
//     // 		localField: "menbres",
//     // 		foreignField: "_id",
//     // 		as: "membresInfo",
//     // 	  },
//     // 	},
//     // 	{
//     // 	  $unwind: "$membresInfo",
//     // 	},
//     // 	{
//     // 	  $project: {
//     // 		_id: "$membresInfo._id",
//     // 		nom: "$membresInfo.nom",
//     // 		prenom: "$membresInfo.prenom",
//     // 		email: "$membresInfo.email",
//     // 		username: "$membresInfo.username",
//     // 		telephone: "$membresInfo.telephone",
//     // 		role: "$membresInfo.role",
//     // 		photoProfil: "$membresInfo.photoProfil",
//     // 	  },
//     // 	}
//     //   ]);
//     const membresInfos = await Promise.all(
//       projectC.menbres.map(async (membreId) => {
//         const membre = await User.findById(membreId);
//         // console.log(membre);
//       })
//     );
//     // console.log(membresInfos);

//     res.status(200).json(membresInfos);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des membres :", error);
//     return res
//       .status(500)
//       .json({ message: "Erreur lors de la récupération des membres", error });
//   }
// });

router.post("/projet/:projectID/users", async (req, res) => {
  const usersIds = req.body;
  try {
    const users = await User.find({ _id: { $in: usersIds } }, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Inviter un membre au projet, si il accepte on l'ajoute.
router.post(
  "/projet/:idproject/adduser/:id",
  checkProjectAminship,
  async (req, res) => {
    const projectId = req.params.idproject;
    const adminId = req.params.id;
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
        const isExists = await GuestUser.findOne({
          email: newUserEmail,
          project_Id: new mongoose.Types.ObjectId(projectId),
        });
        if (memberExists || isExists) {
          return res.status(400).json({
            message:
              "L'email que vous avez fourni est déjà membre ou a déjà été invité au projet",
          });
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
          project_Id: new mongoose.Types.ObjectId(projectId),
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
      res.status(500).json(error);
    }
  }
);
router.post(
  "/project/users/finduserinvite/:token",
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
        console.log(findUser);
        res.status(400).json(guestUser);
      }
    } catch (error) {}
  }
);
// ********************************************************************** //

// Supprimer un membre du projet
router.post(
  "/projet/:idproject/deleteuser/:id",
  checkProjectAminship,
  async (req, res) => {
    const projectId = req.params.idproject;
    const userId = req.body.userId;
    try {
      const deleteUser = await project.updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        {
          $pull: {
            menbres: new mongoose.Types.ObjectId(userId),
            owners: new mongoose.Types.ObjectId(userId),
          },
        }
      );
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  "/projet/:idproject/setToAdmin/:id",
  checkProjectCreator,
  async (req, res) => {
    const projectId = req.params.idproject;
    const userId = req.body.userId;
    try {
      const checkUser = await project.findOne({
        _id: new mongoose.Types.ObjectId(projectId),
        menbres: { $in: [new mongoose.Types.ObjectId(userId)] },
      });
      if (!checkUser) {
        return res
          .status(404)
          .json({ message: "Cet utilisateur n'est pas membre du projet" });
      }

      await project.updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $addToSet: { owners: new mongoose.Types.ObjectId(userId) } }
      );
      res.status(200).json({ message: "Utilisateur est un administrateur" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
router.post(
  "/projet/:idproject/removeToAdmin/:id",
  checkProjectCreator,
  async (req, res) => {
    const projectId = req.params.idproject;
    const userId = req.body.userId;
    try {
      const checkUser = await project.findOne({
        _id: new mongoose.Types.ObjectId(projectId),
        owners: { $in: [new mongoose.Types.ObjectId(userId)] },
      });
      if (!checkUser) {
        return res.status(404).json({
          message: "Cet utilisateur n'est pas administrateur  du projet",
        });
      }
      await project.updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { $pull: { owners: new mongoose.Types.ObjectId(userId) } }
      );
      res
        .status(200)
        .json({ message: "Utilisateur n'est plus un administrateur" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post("/new-notification", async (req, res) => {
  const userMail = req.body.userMail;
  const notifType = req.body.type;
  const message = req.body.message;
  const date = req.body.date;
  try {
    const findUser = await User.findOne({
      email: userMail,
    });
    if (findUser) {
      findUser.notifications.push({
        notification: {
          type: notifType,
          message: message,
          date: date,
          isView: false,
        },
      });
      await findUser.save();
      res.status(200).json("users");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/notifications/:projectId", async (req, res) => {
//   const projectId = req.params.projectId;
//   try {
//     const notifs = await project.findOne(
//       { _id: new mongoose.Types.ObjectId(projectId) },
//       { _id: 0, notifications: 1 }
//     );
//     res.status(200).json({ notifs: notifs });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post("/notifications", async (req, res) => {
  const userMail = req.body.userMail;
  try {
    const notifs = await User.findOne(
      { email: userMail },
      { _id: 0, notifications: 1 }
    );
    if (notifs) {
      res.status(200).json({ notifs: notifs });
    } else {
      res.status(500).json({ erreur: "erreur" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/view-notifications/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.updateOne(
    { _id: new mongoose.Types.ObjectId(userId) },
    { $set: { "notifications.$[].notification.isView": true } }
  );
  res.status(200).json(user);
});

module.exports = router;
