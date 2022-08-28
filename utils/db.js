const mongoose = require("mongoose");
const User = require("../models/Users");

const connectionurl = process.env.DATABASE_URL;

module.exports = {
  async addUserDiscord(email, tag) {
    await mongoose.connect(connectionurl);
    let user = await User.findOne({ email: email });
    
    await mongoose.connection.close()
    console.log("user is : ",user);
    
      if (!user) {
        return null;
      }
      
      user.discordId = tag;
      user.save();

      console.log(user.difficulty)
      return user.difficulty;
  },

  async checkEmail(email) {
    await mongoose.connect(connectionurl);
    let user = await User.findOne({ email: email });
    console.log('user is: ', user)
    await mongoose.connection.close()
    return user;
  }
};