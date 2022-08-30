const { getUserDetails } = require('../utils/db')
const { SlashCommandBuilder } = require('discord.js');
const { hasRole, adminRoleName, verifiedRoleName, adminChannelId } = require('../utils/discord');

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

    if (!hasRole(members, interaction.user.id, adminRoleName)) {
      console.log("Un-Authorised");
      return
    }

    if (!hasRole(members, user.id, verifiedRoleName)) {
      await interaction.reply("User not verified");
      return;
    }

    if (interaction.channelId !== adminChannelId) {
      await interaction.reply("command not found in this channel")
      return;
    }

    let userData = await getUserDetails(user.tag);
    if (!userData) {
      await interaction.reply(`user data for \`${user.tag}\` does not exists`)
      return
    }

    let data = (({ name, discordId, email, difficulty }) => ({ name, discordId, email, course: difficulty }))(userData);

    await interaction.reply({
      content: `\`\`\`json\n${JSON.stringify(data, null, 2)}\`\`\``
    });
  },
};