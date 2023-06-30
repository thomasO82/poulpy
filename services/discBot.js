require('dotenv').config();
const { Client, GatewayIntentBits  } = require('discord.js');
console.log(GatewayIntentBits.FLAGS);
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('ready', () => {
  console.log('discord opé');
});

client.login(process.env.TOKEN_APP);

module.exports = client;