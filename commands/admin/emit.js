module.exports = {
    name: 'emit',
    description: 'Emettre un événement',
    run(client, message, args) {
        if (!args[0] || !args[0].match(/^(guildMemberAd|guildMemberRemove)$/)) return message.reply('Veuillez spécifier un événement valide (\'guildMemberAdd\' ou \'guildMemberRemove\')');	
        
        if (args[0] == 'guildMemberAdd') {
            client.emit('guildMemberAdd', message.member);
            message.reply('L\'événement guildMemberAdd a été emis !');
        } else if (args[0] == 'guildCreate') {
            client.emit('guildCreate', message.guild);
            message.reply('L\'événement guildCreate a été emis !');
        } else {
            client.emit('guildMemberRemove', message.member);
            message.reply('L\'événement guildMemberRemove a été emis !');
        }
    },
    options: [
        {
            name: 'event',
            description: 'Nom de l\'événement',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                }
            ]
        }
    ],
    runSlash(client, interaction) {
        const eventChoice = interaction.options.getString('event');

        if (eventChoice == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({content: 'L\'événement guildMemberAdd a été emis !', ephemereal: true});
        } else if (eventChoice == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({content: 'L\'événement guildCreate a été emis !', ephemereal: true});
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({content: 'L\'événement guildMemberRemove a été emis !', ephemereal: true});
        }
}
};
