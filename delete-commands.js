require('dotenv').config()
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId } = require('./config');
const { BOT_TOKEN } = process.env;

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);