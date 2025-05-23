const multer = require("multer");
const path = require("path");

const stockage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const debut = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, debut + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const types = /jpeg|jpg|png/;
  const extName = types.test(path.extname(file.originalname).toLowerCase());
  const mimeType = types.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb(
      new Error("Seuls les fichiers JPEG, JPG et PNG sont autorisés !"),
      false
    );
  }
};

const upload = multer({
  storage: stockage,
  fileFilter: fileFilter,
});

module.exports = upload;
