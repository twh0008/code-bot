
module.exports = {
  name: "leave",
  description: "Leaves the voice channel the bot is in",
  args: false,
  extra: false,
  execute(message, args) {      

    if(!message.member.voiceChannel) return message.channel.send("You're not in a VoiceChannel");

    const channel = message.member.voiceChannel;
    channel.leave();
    return;


  }
};
