const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bbhelp')
    .setDescription('Manual'),

  async execute(interaction) {
    await interaction.reply(`Commands:\nToken command usage: \`/token <token>\` \nVerify command usage: \`/verify <institute_email_id>\` \n`);
  },
};