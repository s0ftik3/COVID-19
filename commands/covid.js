const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {
    try {
        var options = {
            'method': 'GET',
            'url': 'https://corona.lmao.ninja/v2/all?yesterday',
            'headers': {
            }
          };

        request(options, function (error, response) {
            var obj = JSON.parse(response.body);

            var cases = obj.cases;
            var todayCases = obj.todayCases;
            var deaths = obj.deaths;
            var todayDeaths = obj.todayDeaths;
            var recovered = obj.recovered;
            var todayRecovered = obj.todayRecovered;
            var active = obj.active
            var critical = obj.critical;
            var countries = obj.affectedCountries;

            var percent = 100 - (252 % countries);

            let embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('COVID-19 :microbe:')
                .addField('Cases ☣️', `\`\`\`${cases} (+${todayCases})\`\`\``, true)
                .addField('Deaths ☠️', `\`\`\`${deaths} (+${todayDeaths})\`\`\``, true)
                .addField('Recovered 💊', `\`\`\`${recovered} (+${todayRecovered})\`\`\``, true)
                .addField('Active :sneezing_face:', `\`\`\`${active}\`\`\``, true)
                .addField('Critical :thermometer:', `\`\`\`${critical}\`\`\``, true)
                .addField('Affected Countries :earth_africa:', `\`\`\`${countries} (${percent}%)\`\`\``, true)
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
    name: 'covid'
};