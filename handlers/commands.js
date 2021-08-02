const fs = require("fs");
const ascii = require("ascii-table")
const table = new ascii().setHeading('Command', 'Status');
module.exports = {
    execute: function(client) {
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
                // TO DO: add slash command
            } else {
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
        console.log(table.toString())
    }
}