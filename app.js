require('dotenv').config();

//Requires
const token = process.env.TOKEN;

const fs = require('fs');
const { prefix } = require("./config.json");
const Discord = require("discord.js");

var client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

//usagesMap
//.set(usages, commandObject)

//usagesMap.forEach(key => {
//
//});

client.on(`guildMemberRemove`, msg => {
    let user = msg.nickname ? msg.nickname : msg.user.username;
    channel = client.channels.find('id', '692792362035970100'); 
    channel.send(`${user} left the server`);
});


client.on(`message`, message => {
    //Returns if no prefix || if author is a bot
    if (!message.content.startsWith(`${prefix}`)) return;
    // 

    //Separates command from prefix 
    const userArgs = message.content.toLowerCase().slice(`${prefix.length}`).split(/ +/g);
    const userCommand = userArgs.shift().toLowerCase();

    //Returns if no command
    if (!client.commands.has(userCommand)) return;

    const command = client.commands.get(userCommand);


    try {

        // GENERIC ARGUMENTS
        //================================================================================================================================
        //Checks for help argument
        if (command.args && (userArgs.length > 0 && userArgs[0].toLowerCase() === 'help')) {
            let reply = listUsage(command);
            if (command.extra) {
                reply = listOperator(command, reply, userArgs);
            }
            return message.channel.send(`${reply}`);
        }
        //Checks for operators argument
        if (command.args && (userArgs.length > 0 && userArgs[0].toLowerCase() === 'operators')) {
            let reply = '';
            reply += listOperator(command, reply, userArgs);
            return message.channel.send(`${reply}`);
        }
        //================================================================================================================================
        //Checks for additional arguments
        if (!command.args && (userArgs.length > 0)) {
            return message.channel.send(`\`\`\`There are no additional arguments.\nDefault use is : ${prefix}${command.name}\`\`\``);
        }


        if (command.guildOnly && message.channel.type != 'text') {
            return message.reply(`I can't execute that command inside DMs!`)
        };
        //Checks for too many arguments

        //find a way to compare length for each argument "usage"
        if ((command.args && (userArgs.length > command.maxArgs))) {
            let reply = `You provided too many arguments, ${message.author}\n`;
            reply += `Type \`${prefix}${command.name} help\` for correct use`;
            //reply += listUsage(command);
            return message.channel.send(reply);
        }

        command.execute(message, userArgs);

    }
    catch (err) {
        console.error(err);
        message.reply("There was an error.");
    }

});

function listUsage(command) {
    reply = `\`\`\`Usage: ${prefix}${command.name} <command>\n\n`

    //grabs the usages
    for (var key in command.usages) {
        if (!command.usages.hasOwnProperty(key)) continue;
        var obj = command.usages[key];
        reply += `${key}:  `;;

        for (var prop in obj) {
            if (prop === `description`) {
                reply += `  ${obj[prop]}`;
            } else if (prop === `syntax`) {
                reply += `${prefix}${command.name}`;
                reply += ` ${obj[prop]}`;
            }
        }
        reply += `\n`;
    }
    if (!command.extra) {
        reply += `\`\`\``;
    }
    return reply;

};
function listOperator(command, reply, userArgs) {
    this.reply = reply;
    if (userArgs[0] === `operators`) {
        reply += `\`\`\`\n`;
    } else {
        reply += `\n`
    }
    for (var key in command.operators) {
        if (!command.operators.hasOwnProperty(key)) continue;
        var obj = command.operators[key];
        for (var prop in obj) {
            reply += `  ${obj[prop]}`;
        }
        reply += `\n`;
    }
    reply += `\`\`\``
    return reply;
};





client.on('ready', () => {
    console.log("Ready!");
});


client.login(token);
