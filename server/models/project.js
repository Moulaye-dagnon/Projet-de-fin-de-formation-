const mongoose = require("mongoose");
const projectShema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owners: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  menbres: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  notifications: [
    {
      notification: {
        type: Object, 
      },
    },
  ],
  dueDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectShema);
module.exports = Project;
