require('dotenv').config();

const fetch = require('node-fetch');

//Giphy API Key
const KEY = process.env.GIPHY_API;

module.exports = {
    name: 'gif',
    description: 'Displays random gif',
    args: true,
    usages : {
        random: {
            syntax: ``,
            description: `-Displays a random gif`
        },
        translate: {
            syntax: `<wordToTranslate>`,
            description: `-Displays your word translated into a gif`
        },
        search: {
            syntax: `search <searchTerm>`,
            description: `-Searches for a term`
        },
        help: {
            syntax: `help`,
            description: `-Overview of command`
        } 
    },
    execute(message, args) {
        switch(args.length) {
            //RANDOM GIF
            case 0:
                
                fetch(`https://api.giphy.com/v1/gifs/random?api_key=${KEY}&tag=&rating=G`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        message.channel.send(gif.data.embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        message.channel.send(`There was an error. No gifs :(`);
                        console.log(err);
                    });
                    break;
            //TRANSLATE
            case 1:
                //framework for query
                if (args[0].toLowerCase() === 'search') {
                    break;
                }
                var s = args[0];
                fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${KEY}&s=${s}`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        console.log(gif);
                        message.channel.send(gif.data.embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        message.channel.send(`There was an error. No gifs :(`);
                        console.log(err);
                    });
                    break;
            //SEARCH       
            case 2: 
                if (!args[0].toLowerCase() === 'search') {
                    break;
                }
                var q = args[1];
                let limit = 100;
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${q}&limit=${limit}&offset=0&rating=G&lang=en`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        let random = Math.floor(Math.random() * (`${limit}` - 1) + 1);
                        message.channel.send(gif.data[`${random}`].embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        message.channel.send(`There was an error. No gifs :(`);
                        console.log(err);
                    });
                break;
     
            default:
                break;
        }
    }
};