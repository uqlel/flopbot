const fs = require("fs");
const ascii = require("ascii-table")
const {Collection} = require("discord.js");
const table = new ascii().setHeading('Command', 'Status');
module.exports = {
    execute: async function(client) {
        client.commands = new Collection()
        const commands = fs.readdirSync(`./commands/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            try {
                pull = require(`../commands/${file}`)
                table.addRow(file, '✅');
            }
            catch (error) {
                table.addRow(file, '❌')
            }

            if (pull.name) {
                client.commands.set(pull.name, pull);
            }
        }
        console.log(table.toString())
    }
}