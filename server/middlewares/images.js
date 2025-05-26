const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

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
  storage,
  fileFilter,
});

module.exports = upload;
