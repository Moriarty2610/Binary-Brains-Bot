const mongoose = require("mongoose");
const User = require("../models/Users");

const connectionurl = process.env.DATABASE_URL;

module.exports = {
  async addUserDiscord(email, tag) {
    await mongoose.connect(connectionurl);
    let user = await User.findOne({ email: email });

    if (!user) {
      await mongoose.connection.close()
      return null;
    }

    user.discordId = tag;
    user.save();
    await mongoose.connection.close()
    return user.difficulty;
  },

  async checkEmail(email) {
    await mongoose.connect(connectionurl);
    let user = await User.findOne({ email: email });
    console.log('user is: ', user)
    await mongoose.connection.close()
    return user;
  },

  async getUserDetails(tag) {
    await mongoose.connect(connectionurl);
    let user = await User.find({discordId : tag});
    await mongoose.connection.close();
    return user.length>0 ? user[0] : null;
  }

};