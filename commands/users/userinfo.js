const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new MessageEmbed()
            .setColor('#8e48f7')
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://toppng.com/uploads/preview/discordbot-bot-discord-11563261320iwm1tpnosh.png' : 'https://banner2.cleanpng.com/20180423/aue/kisspng-computer-icons-person-icon-design-knowledge-clipart-5add9d8666ce44.4556482015244732224211.jpg' })
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                    {   name: 'Nom', value: `${member.displayName}`, inline: true},
                    {   name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true},
                    {   name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
                    {   name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', '')}`},
                    {   name: 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp /1000)}:f> (<t:${parseInt(member.user.createdTimestamp /1000)}:R>)`},
                    {   name: 'A rejoint le serveur le le', value: `<t:${parseInt(member.joinedTimestamp /1000)}:f> (<t:${parseInt(member.joinedTimestamp /1000)}:R>)`},
            )
        interaction.reply({ embeds:[embed], ephemeral: true });
    }
};
//a