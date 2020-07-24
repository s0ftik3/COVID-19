const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, msg, args) => {
    if(args[0] == 'me') return msg.channel.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    let embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('To invite the bot')
        .setDescription('Thanks for using Corona Virus Discord bot. I appreciate that you chose this bot. Hopefully you will enjoy!\nThis bot can provide you the most accurate infromation about Corona Virus (COVID-19).')
        .addFields(
            { name: '`=covid`', value: ':microbe: **Global data about current COVID-19 conditions.**', inline: true },
            { name: '`=country <country-name>`', value: ':microbe: **Country data about COVID-19 conditions.**', inline: true },
            { name: '`=continent or =continent <continent-name>`', value: ':microbe: **Continent data about COVID-19 conditions.**', inline: true },
        )
        .setFooter('Made with ❤️ by softik#8376', '')
        .setTimestamp()
        .setURL('https://discordapp.com/api/oauth2/authorize?client_id=722450931681067088&permissions=8&scope=bot')

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'help'
};