require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, channelMention } = require('discord.js');
const token = process.env.BOT_TOKEN
const { discordServerName, verifyChannelId } = require('./config');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on("guildMemberAdd", member => {
    member.send(`Welcome to the ${discordServerName} server!\nPlease verify with your email in ${channelMention(verifyChannelId)} to gain channel access`).catch(console.error); // DMs new user
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      // console.error(error);
      await interaction.deferReply({ content: 'There was an error while executing this command! :\n' + error.message, ephemeral: true });
    }
  }

});

client.login(token);
