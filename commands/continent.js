const Discord = require('discord.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {

    try {
        if (!args.join(' ')) {
            var options = {
                'method': 'GET',
                'url': 'https://corona.lmao.ninja/v2/continents?yesterday=true&sort',
                'headers': {
                }
            };

            request(options, function (error, response) {
                var obj = JSON.parse(response.body);

                var casesAsia = obj[0].cases;
                var deathsAsia = obj[0].deaths;
                var recoveredAsia = obj[0].recovered;

                var casesEU = obj[2].cases;
                var deathsEU = obj[2].deaths;
                var recoveredEU = obj[2].recovered;

                var casesNA = obj[1].cases;
                var deathsNA = obj[1].deaths;
                var recoveredNA = obj[1].recovered;

                var casesSA = obj[3].cases;
                var deathsSA = obj[3].deaths;
                var recoveredSA = obj[3].recovered;

                var casesAfrica = obj[5].cases;
                var deathsAfrica = obj[5].deaths;
                var recoveredAfrica = obj[5].recovered;

                var casesOceania = obj[4].cases;
                var deathsOceania = obj[4].deaths;
                var recoveredOceania = obj[4].recovered;

                let embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('Continents :compass:')
                    .addField('Asia :earth_asia:', `\`\`\`Cases: ${casesAsia}\nDeaths: ${deathsAsia}\nRecovered: ${recoveredAsia}\`\`\``, true)
                    .addField('Europe :earth_africa:', `\`\`\`Cases: ${casesEU}\nDeaths: ${deathsEU}\nRecovered: ${recoveredEU}\`\`\``, true)
                    .addField('North America :earth_americas:', `\`\`\`Cases: ${casesNA}\nDeaths: ${deathsNA}\nRecovered: ${recoveredNA}\`\`\``, true)
                    .addField('South America :earth_americas:', `\`\`\`Cases: ${casesSA}\nDeaths: ${deathsSA}\nRecovered: ${recoveredSA}\`\`\``, true)
                    .addField('Africa :earth_africa:', `\`\`\`Cases: ${casesAfrica}\nDeaths: ${deathsAfrica}\nRecovered: ${recoveredAfrica}\`\`\``, true)
                    .addField('Oceania :earth_asia:', `\`\`\`Cases: ${casesOceania}\nDeaths: ${deathsOceania}\nRecovered: ${recoveredOceania}\`\`\``, true)
                    .setFooter('Data updates every 10 minutes')

                msg.channel.send(embed);
            });
        } else {
            var query = args.join('%20');

            let wrongContinent = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Wrong continent')
                .setDescription('You can use only `Europe, Africa, Asia, North America, South America and Oceania` continents.')

            var options = {
                'method': 'GET',
                'url': `https://corona.lmao.ninja/v2/continents/${query}?yesterday&strict`,
                'headers': {
                }
            };

            request(options, function (error, response) {

                if (error) return msg.channel.send(wrongContinent);
                
                var obj = JSON.parse(response.body);
                
                var cases = obj.cases;

                if (cases == undefined) return msg.channel.send(wrongContinent);
                
                var continent = obj.continent;
                var todayCases = obj.todayCases;
                var deaths = obj.deaths;
                var todayDeaths = obj.todayDeaths;
                var recovered = obj.recovered;
                var active = obj.active
                var critical = obj.critical;

                let embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`Continent :compass:`)
                    .addField('Name :scroll:', `\`\`\`${continent}\`\`\``, true)
                    .addField('Cases ☣️', `\`\`\`${cases} (+${todayCases})\`\`\``, true)
                    .addField('Deaths ☠️', `\`\`\`${deaths} (+${todayDeaths})\`\`\``, true)
                    .addField('Recovered 💊', `\`\`\`${recovered}\`\`\``, true)
                    .addField('Active :adhesive_bandage:', `\`\`\`${active}\`\`\``, true)
                    .addField('Critical :thermometer:', `\`\`\`${critical}\`\`\``, true)
                    .setFooter('Data updates every 10 minutes')
                    .setTimestamp();

                msg.channel.send(embed);
            });
        }
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
    name: 'continent'
};