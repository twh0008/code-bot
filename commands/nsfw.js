require("dotenv").config();

const snoowrap = require("snoowrap");
const fetch = require("node-fetch");

//Giphy API Key
const KEY = process.env.GIPHY_API;
const REDDIT_SECRET = process.env.REDDIT_SECRET;
const REDDIT_USER = process.env.REDDIT_USER;
const REDDIT_CLIENT = process.env.REDDIT_CLIENT;
const REDDIT_REFRESH = process.env.REDDIT_REFRESH;

//default rating

const r = new snoowrap({
  userAgent: "code-bot 0.1",
  clientId: REDDIT_CLIENT,
  clientSecret: REDDIT_SECRET,
  refreshToken: REDDIT_REFRESH
});

module.exports = {
  name: "nsfw",
  description: "Displays nsfw",
  args: true,
  maxArgs: 1,
  extra: false,
  usages: {
    random: {
      syntax: ``,
      description: `-Displays a random nsfw image from /r/bonermaterial`,
      length: 0
    },
    sexy: {
      syntax: `sexy`,
      description: `-Displays a random nsfw image from /r/sexybutnotporn`,
      length: 0
    }
  },
  execute(message, args) {
    if (!message.channel.nsfw) {
      return message.channel.send(
        "Channel must be marked as nsfw to use this command."
      );
    }

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
      case `sexy`:
        var red = r.getSubreddit(`sexybutnotporn`).getRandomSubmission();
        red
          .then(result => {
            var url = result.url;
            return message.channel.send(url);
          })
          .catch(err => {
            return message.channel.send("UH OH, something went wrong");
          });
        break;
      //NSFW Image
      case `t`:
        var red = r.getSubreddit(`bonermaterial`).getRandomSubmission();
        red
          .then(result => {
            var url = result.url;
            return message.channel.send(url);
          })
          .catch(err => {
            return message.channel.send("UH OH, something went wrong");
          });
      default:
        break;
    }
  }
};
