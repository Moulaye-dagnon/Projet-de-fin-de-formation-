const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  dueDate: { type: Date },
  files: [{ type: String }],
  createAd: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
