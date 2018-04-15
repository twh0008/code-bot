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


client.on(`message`, message => {
    //Returns if no prefix || if author is a bot
    if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
    // 
    
    //Separates command from prefix 
    const userArgs = message.content.slice(`${prefix.length}`).split(/ +/g);
    const userCommand = userArgs.shift().toLowerCase();
    
    //Returns if no command
    if (!client.commands.has(userCommand)) return;

    const command = client.commands.get(userCommand);
    
    
    try {
        
        // GENERIC ARGUMENTS
        //================================================================================================================================

        if (command.args && (userArgs.length > 0 && userArgs[0].toLowerCase() === 'help')) {
            let reply = listUsage(command);
            return message.channel.send(`${reply}`);
        };
        //================================================================================================================================

        if (command.guildOnly && message.channel.type != 'text') {
            return message.reply(`I can't execute that command inside DMs!`)
        };
        if ((command.args && (userArgs.length > Object.keys(command.usages).length))) {
            let reply = `You provided too many arguments, ${message.author}\n`;
            reply += listUsage(command);
            return message.channel.send(reply);
        }

        command.execute(message, userArgs);
       
       
        // if (command.args && !userArgs.length) {
        //     let reply = `You didn't provide any arguments, ${message.author}`;
        //     if (command.usage) {
        //         reply += `\n\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        //     }
        //     return message.channel.send(reply);
        // }
  
      
    }
    catch (err) {
        console.error(err);
        message.reply("There was an error.");
    }
    
});


 
    function listUsage(command) {
        let reply = `\`\`\`Usage: ${prefix}${command.name} <command>\n\n`
    
        for (var key in command.usages) {
            if (!command.usages.hasOwnProperty(key)) continue;

            var obj = command.usages[key];
            console.log(obj);
            reply += `${prefix}${command.name} ${key}:`;

            for (var prop in obj) {
                reply += ` ${obj[prop]}`;
            }
            reply += `\n`;
        }
        reply += `\`\`\``;
        return reply;

    };

     



client.on('ready', () => {
    console.log("Ready!");
});


client.login(token);