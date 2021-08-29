const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.toLowerCase() === '!deploy' && message.author.id === process.env.OWNER_ID) {
            const commands = await client.guilds.cache.get(process.env.GUILD_ID).commands.set(require("../slash.js"));
            const embed = new MessageEmbed()
                .setTitle("Komendy zostały zaaktualizowane!")
                .setDescription("```js\n" + JSON.stringify(commands) + "```")
            message.reply({embeds: [embed]})
        }
        else if (message.content.toLowerCase() === '!eval' && message.author.id === process.env.OWNER_ID) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            let query = args.join(' ');
            if (!query) query = null
            try {
                const { inspect } = module.require('util');
                if (message.content.includes('client.token') || message.content.includes('client["token"]') || message.content.includes('client[\'token\']') || message.content.includes('client[`token`]') || message.content.includes('client. token') || message.content.includes('client. token') || message.content.includes('client . token') || message.content.includes('client[`token`]')) {
                    const embederror = new Discord.MessageEmbed()
                        .setTitle(' Error')
                        .setDescription(`Input:\`\`\`js\n${query}\n\`\`\`\n Output:\`\`\`js\nTypeError: Cannot read property 'token' of undefined\n\`\`\``)
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`);

                    return message.reply({embeds: [embederror]})
                }


                let lastResult;
                let hrStart;
                let hrDiff;

                function evald() {

                    try {
                        const hrStart = process.hrtime();
                        lastResult = eval(query)
                        hrDiff = process.hrtime(hrStart);
                    } catch (err) {
                        const embederror = new Discord.MessageEmbed()
                            .setTitle('Error')
                            .setDescription(`Input:\`\`\`js\n${query}\n\`\`\`\n Output:\`\`\`js\n${err}\n\`\`\``)
                            .setColor('RED')
                            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`);

                        return message.reply({embeds: [embederror]})
                    }

                    hrStart = process.hrtime();

                    formatsend(lastResult);
                }

                function formatsend(result) {
                    const inspected = inspect(result, { depth: 0 })
                    const embedgut = new Discord.MessageEmbed()
                        .setTitle('Eval')
                        .setDescription(`Input:\`\`\`js\n${query} \n\`\`\`\n Output:\`\`\`js\n${inspected} \n\`\`\`\n Type:\`\`\`yaml\n${typeof lastResult}\n\`\`\`\nTime: \`\`\`yaml\n${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.\`\`\``)
                        .setColor('GREEN')
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`);

                    message.reply({embeds: [embedgut]})
                }

                evald()
            } catch (err) {
                const embederror = new Discord.MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Input: \`\`\`js\n${query}\n\`\`\`\n Output:\`\`\`yaml\n${err}\n\`\`\``)
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`);
                return message.reply({embeds: [embederror]})
            }
        }
    }
}