module.exports = {
    name: "readyy",
    once: true,
    execute(client) {
        console.log(`${client.user.tag} est prêt !`);
    }
}
