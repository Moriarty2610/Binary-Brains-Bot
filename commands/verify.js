const { SlashCommandBuilder } = require('discord.js');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../utils/sendToken');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify with email!')
    .addStringOption(option => option.setName('email').setDescription('Enter your email')),

  async execute(interaction) {
    const email = interaction.options.getString('email');
    const user = interaction.user.tag;

    // add extra data in token
    const token = jwt.sign({ email: email, user: user }, process.env.JWT_SECRET_KEY,  { expiresIn: '15m' });

    console.log(token)

    sendConfirmationEmail(user, email, token);

    await interaction.reply({
      content: `Kindly verify using the token sent to \`${email}\`\nUse \`/help\` for more info`,
      ephemeral: true
    });
  },
};