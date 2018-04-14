module.exports = {
    name: 'kick',
    description: 'Kicks tagged user',
    guildOnly: true,
    args: false,
    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        if (taggedUser) {
            return message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
        return message.reply(`You need to tag someone first!`);
    }


};