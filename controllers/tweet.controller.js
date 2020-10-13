const db = require("../models/mongoose");

const tweetController = {
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
