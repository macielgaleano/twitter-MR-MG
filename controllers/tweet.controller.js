const db = require("../models/mongoose");

const tweetController = {
  createTweets: (req, res) => {
    let tweets = [];

    for (let i = 0; i < array.length; i++) {
      const tweet = new db.Tweet({
        title: "Historia de la academia",
        author: "Hack Academy",
      });
    }
  },

  allTweets: async (req, res) => {
    res.json(await db.Tweet.find({}));
  },
};

module.exports = tweetController;

// const tweet = new db.Tweet({
//   title: "Historia de la academia",
//   author: "Hack Academy",
// // });
// tweet.save();
