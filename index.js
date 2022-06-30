const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 513 });

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { console.log(`Exiting with code ${code}`) });
process.on('uncaughtException', (err, origin) => { console.log(`Uncaught exception: ${err}`, `Origin: ${origin}`) });
process.on('unhandledRejection', (reason, promise) => { console.log(`Unhandled rejection: ${reason}\n-----\n`, promise) });
process.on('warning', (...args) => console.log(...args));

client.login(process.env.TOKEN);

//force