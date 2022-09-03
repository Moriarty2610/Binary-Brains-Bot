const jwt = require('jsonwebtoken');
const { addUserDiscord } = require("../utils/db")
const { SlashCommandBuilder } = require('discord.js');
const { verifiedRoleName, verifyChannelId } = require('../config');
const { hasRole } = require('../utils/discord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('token')
    .setDescription('Submit verification token')
    .addStringOption(option =>
      option
        .setName('token')
        .setDescription('Enter your token')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    if (interaction.channelId !== verifyChannelId) {
      await interaction.editReply("command not found in this channel")
      return;
    }

    const members = await interaction.guild.members.cache;
    if (hasRole(members, interaction.user.id, verifiedRoleName)) {
      await interaction.editReply("User already verified");
      return;
    }

    const token = interaction.options.getString('token')
    let decoded = jwt.verify(token, process.env.BOT_JWT_SECRET_KEY)
    verified = (decoded.user === interaction.user.tag)
    if (verified !== true) {
      await interaction.editReply("Token verification failed")
      return
    }

    let userRole = await addUserDiscord(decoded.email, decoded.user);


    if (!userRole) {
      await interaction.editReply("Error : Cannot find user role")
      return
    }

    let addRoles = await interaction.guild.roles.cache.filter(role => role.name === userRole || role.name === verifiedRoleName);
    let member = await interaction.guild.members.cache.get(interaction.member.user.id);
    await member.roles.add(addRoles);
    console.log("Added Roles")
    await interaction.editReply("Token verification successful")
  },
};