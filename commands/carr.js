module.exports = {
    name: 'carr',
    description: 'A inside joke with a friend named Carr',
    guildOnly: true,
    args: false,
    execute(message, args) {
        message.reply(`Carr once killed a whole RASP class with one grenade.`);
        message.channel.send(`!!gif search grenade`);
    }
};