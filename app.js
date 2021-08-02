const Discord = require("discord.js")
const client = new Discord.Client()
require("dotenv").config()
client.on("ready", function() {
    console.log("Bot has been started!")
})
client.login(process.env.TOKEN)