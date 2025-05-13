const jwt = require("jsonwebtoken");
const User = require("../models/user");
const GuestUser = require("../models/guestUser");

const authentification = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
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
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
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
      res.status(401).json("Vous n'etes pas autorisé!");
    }
  } else {
    res.status(401).json("Veuillez vous authentifier2!!");
  }
};

const adminAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
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
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
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

module.exports = {
  authentification,
  collaboratorAuth,
  adminAuth,
  userInviteAuth,
};
