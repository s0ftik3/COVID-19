const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {

    try {
        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Wrong input')
            .setDescription('Command usage `=country <country-name>`.');

        let wrongCountry = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Wrong country')
            .setDescription('I couldn\'t find any data about this country.')

        var query = args.join('%20');

        if (!query) msg.channel.send(embed)

        var options = {
            'method': 'GET',
            'url': `https://corona.lmao.ninja/v2/countries/${query}?yesterday&strict&query`,
            'headers': {
            }
          };

        request(options, function (error, response) {
            var obj = JSON.parse(response.body);
            var country = obj.country;
            if (obj.countryInfo == undefined) return msg.channel.send(wrongCountry);
            var cases = obj.cases;
            var todayCases = obj.todayCases;
            var deaths = obj.deaths;
            var todayDeaths = obj.todayDeaths;
            var recovered = obj.recovered;
            var active = obj.active
            var critical = obj.critical;

            let embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Country :dart:')
                .setThumbnail(obj.countryInfo.flag)
                .addField('Name :scroll: ', `\`\`\`${country}\`\`\``, true)
                .addField('Cases ☣️', `\`\`\`${cases} (+${todayCases})\`\`\``, true)
                .addField('Deaths ☠️', `\`\`\`${deaths} (+${todayDeaths})\`\`\``, true)
                .addField('Recovered 💊', `\`\`\`${recovered}\`\`\``, true)
                .addField('Active :sneezing_face:', `\`\`\`${active}\`\`\``, true)
                .addField('Critical :thermometer:', `\`\`\`${critical}\`\`\``, true)
                .setFooter('Data updates every 10 minutes')
                .setTimestamp();

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
    name: 'country'
};