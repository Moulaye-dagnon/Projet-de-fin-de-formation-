const jwt = require("jsonwebtoken");
const User = require("../models/user");
const GuestUser = require("../models/guestUser");
const Project = require("../models/project");
const { default: mongoose } = require("mongoose");

const authentification = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token.split(" ")[1];
    if (!token) {
      res.status(401).json("Veuillez vous authentifier!!");
    } else {
      const decode = jwt.verify(token, process.env.PASSWORD_SECRET_TOKEN);
      const user = await User.findOne({ email: decode.email });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json("Vous n'etes pas autorisé!");
      }
    }
  } else {
    res.status(401).json("Veuillez vous authentifier!!");
  }
};

const collaboratorAuth = async (req, res, next) => {
    const token = req.cookies.token
    try {
      if (!token) {
        res.status(401).json("Veuillez vous authentifier1!!");
      } else { 
        const decode = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await User.findOne({ email: decode.email });

        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json("Vous n'etes pas autorisé!");
        }
      }
    } catch (error) {
      console.log(error)
      res.status(401).json("Vous n'etes pas autorisé!");
    }
};

const adminAuth = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token
    try {
      if (!token) {
        res.status(401).json("Veuillez vous authentifier!!");
      } else {
        const decode = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await User.findOne({ email: decode.email });
        if (user) {
          if (user.role === "admin") {
            req.user = user;
            next();
          } else {
            res
              .status(401)
              .json("Seul l'administrateur du projet peux faire cette action");
          }
        } else {
          res.status(401).json("Vous n'etes pas autorisé!");
        }
      }
    } catch (error) {
      res.status(401).json("Vous n'etes pas autorisé!");
    }
  } else {
    res.status(401).json("Veuillez vous authentifier!!");
  }
};

const userInviteAuth = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token
    try {
      if (!token) {
        res.status(401).json("Veuillez vous authentifier1!!");
      } else {
        const decode = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await GuestUser.findOne({ email: decode.email });
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json("Vous n'etes pas autorisé!");
        }
      }
    } catch (error) {
      res.status(401).json("Vous n'etes pas autorisé!");
    }
  } else {
    res.status(401).json("Veuillez vous authentifier2!!");
  }
};

const isMember = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token
    if (token) {
      const decode = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = await User.findOne({ email: decode.email });
      if (user) {
        const isMembers = await Project.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(req.params.projectID),
              menbres: new mongoose.Types.ObjectId(user._id),
            },
          },
        ]);
        if (isMembers) {
          console.log("first");
          next();
        } else {
          res
            .status(401)
            .json({ error: "Vous n'etes pas membre de ce projet!" });
        }
      } else {
        res.status(409).json({ error: "Utilisateur introuvable!" });
      }
    }
  } else {
    res.status(401).json({ error: "Connectez vous" });
  }
};

module.exports = {
  authentification,
  collaboratorAuth,
  adminAuth,
  userInviteAuth,
  isMember,
};
