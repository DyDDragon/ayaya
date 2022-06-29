const { Client } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 1 });

require('./utils/handlers/EventUtil')(client);

client.once('ready', () => {
    console.log('Ready!');
});   //send a log when connected

client.login(process.env.TOKEN);

