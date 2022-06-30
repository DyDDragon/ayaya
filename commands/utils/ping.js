const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Commande ping',
    async runInteraction(client, interaction) {
        const tryPing = await interaction.reply({content : "Ping ?", fetchReply: true});

        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {   name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
                {   name: 'Latence BOT', value: `\`\`\`${tryPing.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true},
                {   name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp /1000)}:R>`},
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
        interaction.editReply({ content: null, embeds: [embed]});
    }
};
