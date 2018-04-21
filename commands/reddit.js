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
  name: "reddit",
  description: "Displays reddit stuff",
  args: true,
  maxArgs: 3,
  extra: false,
  usages: {
    hot: {
      syntax: `hot <subReddit>`,
      description: `-Displays hot posts in your subreddit of choice`,
      length: 0
    },
    rising: {
      syntax: `rising <subReddit>`,
      description: `-Displays rising posts in your subreddit of choice`,
      length: 0
    },
    new: {
      syntax: `new <subReddit>`,
      description: `-Displays new posts in your subreddit of choice`,
      length: 0
    },
    list: {
      syntax: `list`,
      description: `Links a list of subreddits that can be used`,
      length: 0
    }
  },
  execute(message, args) {

    var subreddit = "";
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
    subreddit = args[0];
    switch (input) {
      //RANDOM GIF
      case `hot`:
        var red = r.getSubreddit(`${subreddit}`).getHot();
        red
          .then(getArray)
          .then(sendEmbed)
          .catch(err => {
            console.log(err);
            return message.channel.send("Either that subreddit doesn't exist or you dont have permission to view it.");
          });
        break;
      case `rising`:
        var red = r.getSubreddit(`${subreddit}`).getRising();
        red
          .then(getArray)
          .then(sendEmbed)
          .catch(err => {
            console.log(err);
            return message.channel.send("Either that subreddit doesn't exist or you dont have permission to view it.");
          });
        break;
      case `new`:
        var red = r.getSubreddit(`${subreddit}`).getNew();
        red
          .then(getArray)
          .then(sendEmbed)
          .catch(err => {
            console.log(err);
            return message.channel.send("Either that subreddit doesn't exist or you dont have permission to view it.");
          });
        break;
      case `list`:
        return message.channel.send(`https://www.reddit.com/r/ListOfSubreddits/wiki/listofsubreddits`);
        break;

      default:
        return message.channel.send(
          "No subreddit was named. Refer to !!reddit help");
        break;
    }
    function getArray(result) {
      var submissions = [];
      result.forEach(submission => {
        if (submission.stickied) {
        } else {
          submissions.push(submission);
        }
      });
      return submissions;
    }

    function sendEmbed(array) {
            for (var i = 0; i < 3; i++) {
              var submission = array[i];
              if(submission.whitelist_status === `promo_adult_nsfw` && !message.channel.nsfw) {
                return message.channel.send("Please use a nsfw channel.")
              }
              var thumbnail = ""
              if(submission.is_reddit_media_domain) {
                thumbnail = submission.thumbnail;
              } 
              console.log(submission);
              var link = `https://www.reddit.com${submission.permalink}`;         
              var created = new Date(submission.created * 1000);
              const embed = {
                "content": "Stuff",
                "title": submission.title,
                "url": link,
                "thumbnail": {
                  "url" : thumbnail
                },
                "color": 9442302,
                "timestamp": created
              };
              message.channel.send({embed});
            }
            return array;
    } 

  }



};
