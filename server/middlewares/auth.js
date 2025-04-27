const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authentification = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(500).json("Veuillez vous authentifier!!");
    } else {
      const decode = jwt.verify(token, process.env.PASSWORD_SECRET_TOKEN);
      const user = await User.findOne({ email: decode.email });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json("Vous n'etes pas autorisé!");
      }
    }
  } else {
    res.status(500).json("Veuillez vous authentifier!!");
  }
};

const collaboratorAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(500).json("Veuillez vous authentifier1!!");
    } else {
      const decode = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = await User.findOne({ email: decode.email });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(500).json("Vous n'etes pas autorisé");
      }
    }
  } else {
    res.status(500).json("Veuillez vous authentifier2!!");
  }
};

const adminAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(500).json("Veuillez vous authentifier!!");
    } else {
      const decode = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = await User.findOne({ email: decode.email });
      if (user) {
        if (user.role === "admin") {
          req.user = user;
          next();
        } else {
          res.status(500).json("Vous n'etes pas autorisé");
        }
      } else {
        res.status(500).json("Vous n'etes pas autorisé");
      }
    }
  } else {
    res.status(500).json("Veuillez vous authentifier!!");
  }
};

module.exports = { authentification, collaboratorAuth, adminAuth };
