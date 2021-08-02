const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
require("dotenv").config()
const ascii = require("ascii-table")
const table = new ascii().setHeading('Handler', 'Status');
const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));

for (const file of handlerFiles) {
    try {
        const handler = require(`./handlers/${file}`)
        handler.execute(client)
        table.addRow(file, "✅")
    } catch (e) {
        table.addRow(file, '❌')
    }
}
console.log(table.toString())

client.login(process.env.TOKEN)