const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const { lorem } = require("faker");
const { post } = require("../models/User");
const path = require("path");

const tweetController = {
  allTweets: async (req, res) => {
    res.json(await db.Tweet.find({}));
  },
  delete: async (req, res) => {
    db.Tweet.deleteOne({ _id: req.params.tweetId }, function (err) {
      if (err) return handleError(err);
      res.redirect("/");
    });
  },
  deleteUser: async (req, res) => {
    db.Tweet.deleteOne({ _id: req.params.tweetId }, function (err) {
      if (err) return handleError(err);
      res.redirect("/usuario/" + req.user.username);
    });
  },
  createTweets: async (req, res) => {
    const tweet = new db.Tweet({
      content: req.body.content_text,
      author: req.user._id,
      date_created: Date.now(),
      likes: 0,
    });
    await tweet.save();
    const tweet_saved = db.Tweet.findOne({ content: req.body.content_text });
    const userTweet = db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { list_tweets: tweet_saved } }
    ).exec(function (err, posts) {
      console.log(posts);
    });
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
            console.log(posts);
            res.render("./pages/homePage.ejs", {
              req: req,
              tweets: posts,
              flag: false,
            });
          });
      });
  },
  home: async (req, res) => {
    console.log(req.params);
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

// const tweet = new db.Tweet({
//   title: "Historia de la academia",
//   author: "Hack Academy",
// // });
// tweet.save();
