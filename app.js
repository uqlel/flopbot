const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
require("dotenv").config()
const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));

for (const file of handlerFiles) {
    const handler = require(`./handlers/${file}`)
    handler.execute(client)
}

client.login(process.env.TOKEN)