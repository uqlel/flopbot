const { SlashCommandBuilder } = require('@discordjs/builders');
commands = []
let data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Oblicza opóźnienie bota')
commands.push(data)
module.exports = commands