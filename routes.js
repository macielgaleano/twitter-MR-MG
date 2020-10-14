const tweetController = require("./controllers/tweet.controller");
const userController = require("./controllers/user.controller");
//const  User   = require("../models/mongoose");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login", userController.showLogin);
  app.get("/registro", userController.showLogin);
  app.post("/login", (req, res) => {});
  app.post("/registro",  userController.createUser);

  //Profile page

  app.post("/:username", (req, res) => {});

  //Crear data

  app.get("/crearData", tweetController.createTweets);
};

module.exports = {
  routes,
};
