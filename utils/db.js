const mongoose = require("mongoose");
const User = require("../models/Users");

const connectionurl = process.env.DATABASE_URL;
mongoose.connect(connectionurl);

module.exports = {
  async addUserDiscord(name, email) {
    let {err, user} = await User.findOne({ email: email });
    // , (err, user) => {
    //   if (!user) {
    //     return null;
    //   }
    //   user.discordId = name;
    //   user.save((err) => {
    //   });
    //   return user.difficulty;
    // });
  },

  async checkEmail(email) {
    let user = await User.findOne({ email: email });
    return user;
  }
};