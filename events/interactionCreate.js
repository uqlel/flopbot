module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        if (!client.commands.has(interaction.commandName)) return;

        try {
            await client.commands.get(interaction.commandName).execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Nie można wykonać komendy', ephemeral: true });
        }
    },
};