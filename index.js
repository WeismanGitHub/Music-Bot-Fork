const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const express = require('express');
require("dotenv").config()

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
});

const app = express()
const port = process.env.PORT || 5000
// The reason for making it a web app is because Replit requires it.
app.get('/', (req, res) => res.send('online...'));
app.listen(port, () => console.log(`server is starting on port ${port}...`));

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.login(client.config.app.token);