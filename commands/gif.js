require('dotenv').config();

const fetch = require('node-fetch');

//Giphy API Key
const KEY = process.env.GIPHY_API;

//default rating

module.exports = {
    name: 'gif',
    description: 'Displays random gif',
    args: true,
    maxArgs: 4,
    extra: true,
    usages: {
        random: {
            syntax: ``,
            description: `-Displays a random gif`,
            length: 0
        },
        translate: {
            syntax: `<wordToTranslate>`,
            description: `-Displays your word translated into a gif`,
            length: 0
        },
        search: {
            syntax: `search <searchTerm>`,
            description: `-Searches for a term`,
            length: 0
        },
        help: {
            syntax: `help`,
            description: `-Overview of command`,
            length: 0
        }
    },
    operators: {
        ratedY: {
            syntax: `-y`,
            description: `Rated Y`
        },
        ratedG: {
            syntax: `-g`,
            description: `Rated G`
        },
        ratedPG: {
            syntax: `-pg`,
            description: `Rated PG`
        },
        ratedPG13: {
            syntax: `-pg13`,
            description: `Rated PG-13`
        },
        ratedR: {
            syntax: `-r`,
            description: `Rated R`
        },
    },
    execute(message, args) {
        var rating = `G`;
        var q;



        if (this.extra) {
            //could add a count for the number of -* in args..

            for (key in this.operators) {
                let obj = this.operators[key];
                //for (var prop in obj) {
                let index = args.indexOf(`${obj.syntax}`);
                if (index > -1) {
                    let ret = `${obj.syntax.replace(`-`, ``)}`;
                    //Change rating to obj.description
                    rating = ret;
                    //remove
                    args.splice(index, 1);
                    break;
                }
                // }
            }
        }

        //let input = 
        var input = ``;
        //if args, assign t for translate
        if (args[0]) input = `t`;

        for (c in this.usages) {
            let obj = this.usages[c];

            let synr = obj.syntax.replace(/ *\<[^>]*\> */g, "");
            //match argument with "case"
            let index = args.indexOf(`${synr}`);
            if (index > -1) {
                //remove words with <> from syntax
                input = args[index];
                args.splice(index, 1);
                break;
            }
        }


        q = args[0];

        switch (input) {
            //RANDOM GIF
            case ``:
                fetch(`https://api.giphy.com/v1/gifs/random?api_key=${KEY}&tag=&rating=${rating}`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        return message.channel.send(gif.data.embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        console.log(err);
                        return message.channel.send(`There was an error. No gifs :(`);
                    });
                break;
            //TRANSLATE
            case `t`:
                //framework for query            
                fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${KEY}&s=${q}`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        return message.channel.send(gif.data.embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        console.log(err);
                        return message.channel.send(`There was an error. No gifs :(`);
                    });
                break;
            //SEARCH       
            case `search`:
                if (!args[0]) return message.channel.send(`Proper syntax: !!gif search <word>`);
                let limit = 100;
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${q}&limit=${limit}&offset=0&rating=${rating}&lang=en`)
                    //parseJSON
                    .then(res => {
                        return res.json();
                    })
                    //send GIF through message
                    .then(gif => {
                        let random = Math.floor(Math.random() * (`${limit}` - 1) + 1);
                        return message.channel.send(gif.data[`${random}`].embed_url);
                    })
                    //catch errors
                    .catch(err => {
                        console.log(err);
                        return message.channel.send(`No gifs with that word/phrase. Maybe try using a different word/phrase.`);
                    });
                break;
            default:

                break;
        }
    }
};