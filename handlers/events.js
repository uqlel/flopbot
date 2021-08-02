const fs = require("fs");
const ascii = require("ascii-table")
const table = new ascii().setHeading('Event', 'Status');
module.exports = {
    execute: function(client) {
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            try {
                const event = require(`../events/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
                table.addRow(file, "✅")
            }
            catch (e) {
                table.addRow(file, '❌')
            }
        }
        console.log(table.toString())
    }
}