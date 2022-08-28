const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: {
    unique: true,
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  codeforces_handle: {
    unique: true,
    type: String,
  },
  password: String,
  total_points: {
    type: Number,
    default: 0,
  },
  history: [
    {
      date: String,
      points: Number,
    },
  ],
  phone: Number,
  difficulty: String,
  discordId : {
    type : String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
