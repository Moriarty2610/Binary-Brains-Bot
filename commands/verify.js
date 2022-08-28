const { SlashCommandBuilder } = require('discord.js');
const jwt = require('jsonwebtoken');
const { checkEmail } = require('../utils/db');
const { sendConfirmationEmail } = require('../utils/sendmail');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify with email!')
    .addStringOption(option => option.setName('email').setDescription('Enter your email')),

  async execute(interaction) {
    const email = interaction.options.getString('email');
    const user = interaction.user.tag;

    let isValidEmail = await checkEmail(email);

    if(!isValidEmail){
      interaction.reply({
        content : "Email not registered",
        ephemeral : true
      });
      return
    }

    const token = jwt.sign({ email: email, user: user }, process.env.BOT_JWT_SECRET_KEY,  { expiresIn: '15m' });

    console.log("token: ",token)

    // sendConfirmationEmail(user, email, token, isValidEmail.name);

    await interaction.reply({
      content: `Kindly verify using the token sent to \`${email}\`\nUse \`/bbhelp\` for more info`,
      ephemeral: true
    });
  },
};