const Discord = require('discord.js');
const cron = require('cron');

const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = "$$";


Client.once("ready", () => {
    console.log(`Online as ${Client.user.tag}`);

    //send a log when discnected
    Client.on("disconnect", () => {
        console.log("Disconnected");
    }
    );

    let scheduledMessage = new cron.CronJob('00 00 22 * * *', () => {
      // This runs every day at 10:30:00, you can do anything you want
      // Specifing your guild (server) and your channel
         const guild = Client.guilds.cache.get('860957448110342155');
         const channel = guild.channels.cache.get('971486901796208720');
         channel.send('C\'est l\'heure du cochon ! <@333521084685221898>');
        });

    scheduledMessage.start(); //Changer "stop" par "start" pour lancer le bot

});

Client.login(process.env.TOKEN);

Client.on("messageCreate", message => {
    if (message.author.bot) return;
    
    //send the ping duration
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send(`Pong! \`${Client.ws.ping}ms\``);
    }

    //purge
    if (message.content.startsWith(prefix + "purge")) {
        const args = message.content.split(" ");
        if (args.length < 2) {
            message.channel.send("Vous devez préciser un nombre de messages à supprimer.");
            return;
        }
        const amount = parseInt(args[1]);
        if (isNaN(amount)) {
            message.channel.send("Vous devez préciser un nombre de messages à supprimer.");
            return;
        }
        if (amount > 100) {
            message.channel.send("Vous ne pouvez pas supprimer plus de 100 messages à la fois.");
            return;
        }
        message.channel.bulkDelete(amount + 1);
    }

    //stop the bot
    if (message.content.startsWith(prefix + "stop")) {
        message.channel.send("Arrêt du bot...");
        Client.destroy();
    }
    
    //send the link to the bot
    if (message.content.startsWith(prefix + "link")) {
        message.channel.send("Voici le lien du bot : \n" +
            "https://discordapp.com/oauth2/authorize?client_id=724098984100868352&scope=bot&permissions=8");
    }

    //add someone to a channel
    if (message.content.startsWith(prefix + "add")) {
        const args = message.content.split(" ");
        console.log(args);
        if (args.length < 2) {
            message.channel.send("Vous devez préciser un utilisateur à ajouter.");
            return;
        }
        const user = message.mentions.users.first();
        console.log(user.tag);
        if (!user) {
            message.channel.send("Vous devez préciser un utilisateur à ajouter.");
            return;
        }
        const channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send("Vous devez préciser un channel.");
            return;
        }
        message.channel.permissionOverwrites(user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`${user.tag} a été ajouté au channel ${channel.name}`);
    }

    //add the sender to a channel
    /*if (message.content.startsWith(prefix + "add")) {
        const args = message.content.split(" ");
        if (args.length < 2) {
            message.channel.send("Vous devez préciser un channel.");
            return;
        }
        const channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send("Vous devez préciser un channel.");
            return;
        }
        channel.overwritePermissions(message.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`Vous avez été ajouté au channel ${channel.name}`);
    }*/


    //help
    if (message.content.startsWith(prefix + "help")) {
        message.channel.send("Voici la liste des commandes : \n" +
            "$$ping : affiche le ping du bot \n" +
            "$$purge <nombre> : supprime <nombre> messages \n" +
            "$$link : affiche le lien du bot \n" +
            "$$stop : arrête le bot"+
            "$$help : affiche la liste des commandes");
    }

    //send a message when the bot is mentioned
    if (message.content.startsWith(`<@${Client.user.id}>`)) {
        message.channel.send("Salut ! Je suis ***Cochon-bot*** ! \n" +
            "Pour avoir la liste des commandes, tapez **$$help**");
    }


    
    
});