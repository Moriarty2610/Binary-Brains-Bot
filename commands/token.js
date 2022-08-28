const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionResponse } = require('discord.js');
const jwt = require('jsonwebtoken');
const {addUserDiscord} = require("../utils/db")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('token')
    .setDescription('Submit verification token')
    .addStringOption(option => option.setName('token').setDescription('Enter your token')),

  async execute(interaction) {
    const token = interaction.options.getString('token')
    let decoded = jwt.verify(token, process.env.BOT_JWT_SECRET_KEY)
    verified = (decoded.user === interaction.user.tag)
    if (verified !== true) {
      await interaction.reply("Token verification failed")
      return
    }

    let userRole = await addUserDiscord(decoded.email, decoded.user);

    if (!userRole) {
      interaction.reply("Error : Cannot find user role")
    }

    let addRole = interaction.guild.roles.cache.find(role => role.name === userRole);
    interaction.member.roles.add(addRole);
    interaction.reply("Token verification successful")

  },
};