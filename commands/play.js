module.exports = {
  name: "play",
  description: "Plays a song",
  args: false,
  extra: false,
  execute(message, args) {
    //get voice connection
    const connections = message.client.voiceConnections;
    console.log(connections);
    let voiceConnection = "";
    connections.forEach(element => {
        voiceConnection = element;
    });
}
}
