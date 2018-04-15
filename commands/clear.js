module.exports = {
    name: 'clear',
    description: 'Clears all messages',
    args: false,
    extra: false,
    execute(message, args) {
        message.channel.fetchMessages({ limit: 100 })
            .then(messages => {
                amount = `${messages.size}`;
                if ((amount >= 2 && amount <= 100) && (message.channel.parent.name === 'bots')) {
                    message.channel.bulkDelete(amount, true).catch(err => {
                        console.log(err);
                        message.channel.send(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
    }
};