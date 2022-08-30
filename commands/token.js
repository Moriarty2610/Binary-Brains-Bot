const jwt = require('jsonwebtoken');
const { addUserDiscord } = require("../utils/db")
const { SlashCommandBuilder } = require('discord.js');
const { verifiedRoleName, verifyChannelId } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('token')
    .setDescription('Submit verification token')
    .addStringOption(option => option.setName('token').setDescription('Enter your token')),

  async execute(interaction) {
    if (interaction.channelId !== verifyChannelId) {
      await interaction.reply("command not found in this channel")
      return;
    }

    const token = interaction.options.getString('token')
    let decoded = jwt.verify(token, process.env.BOT_JWT_SECRET_KEY)
    verified = (decoded.user === interaction.user.tag)
    if (verified !== true) {
      await interaction.reply("Token verification failed")
      return
    }

    let userRole = await addUserDiscord(decoded.email, decoded.user);

    if (!userRole) {
      await interaction.reply("Error : Cannot find user role")
      return
    }

    let addRoles = interaction.guild.roles.cache.filter(role => role.name === userRole || role.name === verifiedRoleName);
    // let verifiedRole = interaction.guild.roles.cache.find(role => role.name === verifiedRoleName)
    await interaction.member.roles.add(addRoles);
    await interaction.reply("Token verification successful")
  },
};