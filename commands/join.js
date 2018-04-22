module.exports = {
    name: 'join',
    description: 'Joins voice channel user is in',
    args: false,
    extra: false,
    execute(message, args) {
        if(!message.member.voiceChannel) return message.channel.send(`You need to join a channel first!`);
        const channel = message.member.voiceChannel;
        if(!channel.joinable) return;
        if(message.guild.afkChannelID == channel.id) return message.channel.send(`Can't join AFK channel`);
        channel
          .join()
          .then(connection => console.log("Connected!"))
          .catch(console.error);
    }
};

