const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Commande ping',
    runInteraction(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle('Pong !')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {   name: 'Latence', value: `\`${client.ws.ping}ms\``, inline: true},
                {   name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp /1000)}:R>`},
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, icon_url: interaction.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed]});
    }
};
