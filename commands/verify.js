const jwt = require('jsonwebtoken');
const { checkEmail } = require('../utils/db');
const { SlashCommandBuilder } = require('discord.js');
const { sendConfirmationEmail } = require('../utils/sendmail');
const { verifyChannelId } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify with email!')
    .addStringOption(option => option.setName('email').setDescription('Enter your email')),

  async execute(interaction) {
    if (interaction.channelId !== verifyChannelId) {
      await interaction.reply("command not found in this channel")
      return;
    }

    const email = interaction.options.getString('email');
    const user = interaction.user.tag;

    let isValidEmail = await checkEmail(email);

    if (!isValidEmail) {
      await interaction.reply({
        content: "Email not registered",
        ephemeral: true
      });
      return
    }

    const token = jwt.sign({ email: email, user: user }, process.env.BOT_JWT_SECRET_KEY, { expiresIn: '15m' });

    sendConfirmationEmail(user, email, token, isValidEmail.name);

    await interaction.reply({
      content: `Kindly verify using the token sent to \`${email}\`\nUse \`/bbhelp\` for more info`,
      ephemeral: true
    });
  },
};