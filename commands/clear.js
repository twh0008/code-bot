module.exports = {
    name: 'clear',
    description: 'Clears all messages',
    args: false,
    extra: false,
    execute(message, args) {
        if (!message.channel.parent && !message.channel.nsfw) return;
        if ((message.channel.parent.name !== bots) || (!message.channel.nsfw)) return;

        message.channel.fetchMessages({ limit: 100 })
            .then(messages => {
                amount = `${messages.size}`;
                if (amount >= 2 && amount <= 100) {
                  message.channel
                    .bulkDelete(amount, true)
                    .catch(err => {
                      console.log(err);
                      message.channel.send(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
    }
};