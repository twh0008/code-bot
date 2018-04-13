const fetch = require('node-fetch');

require('dotenv').config();
//Requires

const key = process.env.GIPHY_API;



module.exports = {
    name: 'gif',
    description: 'Displays random gif',
    execute(message, args) {
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=&rating=G`)
        .then(stuff =>{
            console.log(stuff);
            message.channel.send(`Fetching...`);
        });
        // .then(err => {
        //     console.log(err);
        // });

        // .then() //parseJSON
        // .then() //send message
        // .catch() //other errors
    }


};