const tweetController = require("./controllers/tweet.controller");

const routes = (app) => {
  app.get("/", tweetController.allTweets);
};

module.exports = {
  routes,
};
