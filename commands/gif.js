require('dotenv').config();

const fetch = require('node-fetch');

//Giphy API Key
const key = process.env.GIPHY_API;



module.exports = {
    name: 'gif',
    description: 'Displays random gif',
    execute(message, args) {
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=&rating=G`)
        .then(res =>{
            return res.json();
        })
        .then(gif => {
            message.channel.send(gif.data.embed_url);
        })
        .catch(err => {
            message.channel.send(`There was an error. No gifs :(`);
            console.log(err);
        });
        // .then(err => {
        //     console.log(err);
        // });

        // .then() //parseJSON
        // .then() //send message
        // .catch() //other errors
    }


};