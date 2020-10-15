const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const { lorem } = require("faker");

const tweetController = {
  allTweets: async (req, res) => {
    res.json(await db.Tweet.find({}));
  },
  delete: async (req, res) => {
    db.Tweet.deleteOne({ _id: req.params.tweetId }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
  },
};

module.exports = tweetController;

// const tweet = new db.Tweet({
//   title: "Historia de la academia",
//   author: "Hack Academy",
// // });
// tweet.save();
