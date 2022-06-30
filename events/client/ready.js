module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} est prêt !`);

        const devGuild = await client.guilds.cache.get("627258958251556924");
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};
