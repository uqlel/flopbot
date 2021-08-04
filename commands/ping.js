const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ping',
    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setAuthor(`Ping API: ${client.ws.ping}ms`)
        await interaction.reply({embeds: [embed]});
    },
};