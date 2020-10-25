const db = require("../models/mongoose");
const fetch = require("node-fetch");
const path = require("path");

const tweetController = {
  delete: async (req, res) => {
    db.Tweet.deleteOne({ _id: req.params.tweetId }, function (err) {
      if (err) return handleError(err);
      res.redirect("/");
    });
  },
  createTweets: async (req, res) => {
    const tweet = new db.Tweet({
      content: req.body.content_text,
      author: req.user._id,
      date_created: Date.now(),
    });
    await tweet.save();
    const tweet_saved = db.Tweet.findOne({ content: req.body.content_text });
    const userTweet = db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { list_tweets: tweet_saved } }
    ).exec(function (err, posts) {});
    res.redirect("/");
  },

  homeFirst: async (req, res) => {
    let user = req.user._id;
    let followings = await db.User.findOne({
      username: req.user.username,
    })
      .select("list_users_following")
      .exec(async (err, posts) => {
        let tweets = db.Tweet.find({
          $or: [
            { author: user },
            {
              author: {
                $in: posts.list_users_following,
              },
            },
          ],
        })
          .sort({
            date_created: "desc",
          })
          .populate("author")
          .exec(function (err, posts) {
            res.render("./pages/homePage", {
              req: req,
              tweets: posts,
            });
            // fetch(`/possibleFollowers`)
            //   .then((data) => data.json())
            //   .then(async (data) => {

            //   });
          });
      });
  },
  pagination: async (req, res) => {
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
          .populate("author")
          .limit(20 * req.params.id)
          .exec(function (err, posts) {
            res.render("./pages/homePage.ejs", { req: req, tweets: posts });
          });
      });
  },
};

module.exports = tweetController;
