const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .addStringOption(option => option.setName('email').setDescription('Enter your email')),

  async execute(interaction) {
    const email = interaction.options.getString('email');
    await interaction.reply(`Ding Dong Pong Pong! to ${email}`);
  },
};