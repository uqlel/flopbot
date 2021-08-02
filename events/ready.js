module.exports = {
    name: 'ready',
    once: false,
    execute(client) {
        console.log(`Hello, World! Logged as ${client.user.tag} on ${client.guilds.cache.size} guilds`);
    },
};