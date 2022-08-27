const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionResponse } = require('discord.js');
const jwt = require('jsonwebtoken');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('token')
    .setDescription('Submit verification token')
    .addStringOption(option => option.setName('token').setDescription('Enter your token')),

  async execute(interaction) {
    const token = interaction.options.getString('token')
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      verified = (decoded.user === interaction.user.tag)
      await interaction.reply(`Token verification ${(verified === true) ? "successful" : "failed"}`)
    } catch (err) {
      await interaction.reply(err.message)
    }
  },
};