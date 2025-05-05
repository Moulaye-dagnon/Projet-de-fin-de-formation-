const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestUserSchema = new Schema({
  project_Id: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  authTokens: [
    {
      authToken: {
        type: String,
      },
    },
  ],
});

const GuestUser = mongoose.model("GuestUser", guestUserSchema);
module.exports = GuestUser;
