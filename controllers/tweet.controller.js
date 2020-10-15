const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const { lorem } = require("faker");
const { post } = require("../models/User");

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
  home: async (req, res) => {
    let followings = await db.User.findOne({
      username: req.user.username,
    })
      .select("list_users_following")
      .exec(function (err, posts) {
        let tweets = db.Tweet.find({
          author: {
            $in: posts.list_users_following,
          },
        })
          .sort({
            date_created: "desc",
          })
          .limit(1)
          .populate("author")
          .exec(function (err, posts) {
            console.log(posts);
            res.render("./pages/homePage.ejs", { req: req, tweets: posts });
          });
      });
    db.Tweet();
  },
};

module.exports = tweetController;

// const tweet = new db.Tweet({
//   title: "Historia de la academia",
//   author: "Hack Academy",
// // });
// tweet.save();
