const tweetController = require("./controllers/tweet.controller");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login", (req, res) => {});
  app.get("/register", (req, res) => {});
  app.post("/login", (req, res) => {});
  app.post("/register", (req, res) => {});

  //Profile page

  app.post("/:username", (req, res) => {});
};

module.exports = {
  routes,
};
