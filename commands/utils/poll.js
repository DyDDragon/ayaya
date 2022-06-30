const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Poster votre propre sondage',
    run(client, message, args) {
        if (!args[0] || !args[0].match(/^(guildMemberAd|guildMemberRemove)$/)) return message.reply('Veuillez spécifier un événement valide (\'guildMemberAdd\' ou \'guildMemberRemove\')');	
        
        if (args[0] == 'guildMemberAdd') {
            client.emit('guildMemberAdd', message.member);
            message.reply('L\'événement a été emis !');
        } else {
            client.emit('guildMemberRemove', message.member);
            message.reply('L\'événement a été emis !');
        }
    },
    options: [
        {
            name: 'title',
            description: 'Tapez le titre de votre sondage',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Tapez la question de votre sondage',
            type: 'STRING',
            required: true,
        }
    ],
    async runSlash(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
            .setTitle(pollTitle)
            .setDescription(pollContent)
            .setColor('#00a3b5')
            .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag}` })
            .setTimestamp();

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('<:BRed:789598874678984755>')
        poll.react('<:GoAwaySatan:694858112703660083>')
    }
};
