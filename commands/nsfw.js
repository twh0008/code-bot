require("dotenv").config();

const fetch = require("node-fetch");

//Giphy API Key
const KEY = process.env.GIPHY_API;

//default rating

module.exports = {
  name: "nsfw",
  description: "Displays nsfw",
  args: true,
  maxArgs: 2,
  extra: false,
  usages: {
    random: {
      syntax: ``,
      description: `-Displays a random nsfw gif or image from /r/nsfw`,
      length: 0
    },
    gif: {
      syntax: `gif`,
      description: `-Displays a random nsfw gif`,
      length: 0
    }
  },
  execute(message, args) {
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
    var input = `t`;
    //if args, assign t for translate
    if (args[0]) input = args[0];

    for (c in this.usages) {
      let obj = this.usages[c];

      let synr = obj.syntax.replace(/ *\<[^>]*\> */g, "").toLowerCase();
      //match argument with "case"
      let index = args.indexOf(`${synr}`);
      if (index > -1) {
        //remove words with <> from syntax
        input = args[index];
        args.splice(index, 1);
        break;
      }
    }

    switch (input) {
      //RANDOM GIF
      case `gif`:
        fetch(`https://www.reddit.com/r/Gif_sources/.json`)
          //parseJSON
          .then(parseJSON)
          //send GIF through message
          .then(findRandom)
          .then(sendMessage)
          //catch errors
          .catch(err => {
            console.log(err);
          });
        break;
      //NSFW Image
      case `t`:
        fetch(`https://www.reddit.com/r/nsfw.json`)
          //parseJSON
          .then(parseJSON)
          //send GIF through message
          .then(findRandom) // return message.channel.send(data.data.embed_url);    //image = data.children[index].data.url
          .then(sendMessage)
          //catch errors
          .catch(err => {
            console.log(err);
            return message.channel.send(`There was an error. No gifs :(`);
          });
        break;
      default:
        break;
    }

    function parseJSON(res) {
      return res.json().then(parsedData => {
        return parsedData.data.children;
      });
    }
    function findRandom(data) {
      var randomIndex = Math.floor(Math.random() * 24 + 1);
      return data[randomIndex].data.url;
    }
    function sendMessage(url) {
      console.log(url);
      return message.channel.send(url);
    }
  }
};
