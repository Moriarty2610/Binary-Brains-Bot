const jwt = require('jsonwebtoken');
const { checkEmail } = require('../utils/db');
const { SlashCommandBuilder } = require('discord.js');
const { sendConfirmationEmail } = require('../utils/sendmail');
const { verifyChannelId, jwtTokenLife, verifiedRoleName } = require('../config');
const { hasRole } = require('../utils/discord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify with email!')
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription('Enter your email')
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

    const email = interaction.options.getString('email');
    const user = interaction.user.tag;

    let isValidEmail = await checkEmail(email);

    if (!isValidEmail) {
      await interaction.editReply({
        content: "Email not registered",
        ephemeral: true
      });
      return
    }

    const token = jwt.sign({ email: email, user: user }, process.env.BOT_JWT_SECRET_KEY, { expiresIn: jwtTokenLife });

    sendConfirmationEmail(user, email, token, isValidEmail.name);

    await interaction.editReply({
      content: `Kindly verify using the token sent to \`${email}\`\nUse \`/bbhelp\` for more info`,
      ephemeral: true
    });
  },
};