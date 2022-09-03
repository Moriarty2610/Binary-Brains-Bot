const { getUserDetails } = require('../utils/db')
const { SlashCommandBuilder } = require('discord.js');
const { hasRole } = require('../utils/discord');
const { adminRoleName, verifiedRoleName, adminChannelId } = require('../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('query')
    .setDescription('Query User')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user you want to query')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = await interaction.options.getUser('user');
    const members = await interaction.guild.members.cache;

    await interaction.deferReply();

    if (!hasRole(members, interaction.user.id, adminRoleName)) {
      console.log("Un-Authorised");
      await interaction.editReply("Un-authorised");
      return
    }

    if (!hasRole(members, user.id, verifiedRoleName)) {
      await interaction.editReply("User not verified");
      return;
    }

    if (interaction.channelId !== adminChannelId) {
      await interaction.editReply("command not found in this channel")
      return;
    }

    let userData = await getUserDetails(user.tag);
    if (!userData) {
      await interaction.editReply(`user data for \`${user.tag}\` does not exists`)
      return
    }

    let data = (({ name, discordId, email, difficulty }) => ({ name, discordId, email, course: difficulty }))(userData);

    await interaction.editReply({
      content: `\`\`\`json\n${JSON.stringify(data, null, 2)}\`\`\``
    });
  },
};