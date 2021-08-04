const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.toLowerCase() === '!deploy' && message.author.id === process.env.OWNER_ID) {
            const commands = await client.guilds.cache.get(process.env.GUILD_ID).commands.set(require("../slash.json"));
            const embed = new MessageEmbed()
                .setTitle("Komendy zostały zaaktualizowane!")
                .setDescription("```js\n" + commands + "```")
            message.reply({embeds: [embed]})
        }
    }
}