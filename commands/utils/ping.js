module.exports = {
    name: 'ping',
    description: 'Commande ping',
    run(client, message, args) {
        message.channel.send('Pong !');
    },
    runInteraction(client, interaction) {
        interaction.reply('Pong !');
    }
};
