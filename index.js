const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const token = config.token;
const prefix = config.prefix;
const fs = require('fs');

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready! Works on ${bot.guilds.cache.size} guild(s).`);

    bot.user.setPresence({
        activity: {
            name: `=help`,
            type: "PLAYING",
        },
        status: 'online'
    });

    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });
});

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log('There are no commands to load!');

    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

bot.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.guild === null) return;

    let messageArray = msg.content.split(" ");

    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, msg, args);
})

bot.login(token);