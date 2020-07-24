const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {
    try {
        var options = {
            'method': 'GET',
            'url': 'https://covid19-us-api.herokuapp.com/news',
            'headers': {
            }
          };

        request(options, function (error, response) {
            var obj = JSON.parse(response.body)

            var i = Math.floor(Math.random() * obj.message.length);
            var title = obj.message[i].title;
            var url = obj.message[i].url;
            var published = obj.message[i].published;

            let embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Corona Virus News :newspaper:')
                .setDescription(title)
                .addField('Source :link:', url)
                .setFooter(published.slice(0, 23))

            msg.channel.send(embed);
        });
    } catch (error) {
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error')
            .setDescription('Something went wrong. Please, try again later.');

        msg.channel.send(embed);

        console.log(error);
    }
};

module.exports.help = {
    name: 'news'
};