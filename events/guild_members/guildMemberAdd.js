const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        const embed = new MessageEmbed()
            .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL()})
            .setColor('#21ff81')
            .setDescription(`± Nom d'utilisateur : ${member}
            ± Créé le : <t:${member.user.createdTimestamp /1000}:f> (<t:${member.user.createdTimestamp /1000}:R>)
            ± Rejoint le : <t:${member.joinedTimestamp /1000}:f> (<t:${member.joinedTimestamp /1000}:R>)`)
            .setFooter({ text: 'Le membre a rejoint le serveur' })
            .setTimestamp();

        const logChannel = client.channels.cache.get('627534874210861056');
        logChannel.send({embeds: [embed]});
    },
};
