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
}




client.on(`message`, message => {
    //Returns if no prefix || if author is a bot
    if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
    
    //Separates command from prefix 
    const args = message.content.slice(`${prefix.length}`).split(/ +/);
    const commandName = args.shift().toLowerCase();
    

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    
    try {
        command.execute(message, args);

        if(command.guildOnly && message.channel.type != 'text') {
            return message.reply(`I can't execute that command inside DMs!`)
        };

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}`;
            if (command.usage) {
                reply += `\n\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);




        }
    }
    catch (err) {
        console.error(err);
        message.reply("There was an error.");
    }
    
});



client.on('ready', () => {
    console.log("Ready!");
});



client.login(token);