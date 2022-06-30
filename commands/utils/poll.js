const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    description: 'Poster votre propre sondage',
    
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
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
            .setTitle(pollTitle)
            .setDescription(pollContent)
            .setColor('#00a3b5')
            .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag}` })
            .setTimestamp();

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅');
        poll.react('❌');
    }
};
