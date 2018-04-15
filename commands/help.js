module.exports = {
    name: 'help',
    description: 'Help command',
    args: false,
    execute(message, args) {
        // message.channel.send('Help you? Ha.');
        for(var command in client.commands) {
            console.log(command);
        }

    }


};