const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login", userController.showLogin);
  app.get("/registro", userController.showLogin);
  app.post("/login", (req, res) => {});
  app.post("/registro", userController.createUser);

  //Profile page

  app.get("/usuario/:username", userController.userPage);

  //Crear data

  app.get("/creardata", seeder.createTweets);
};

module.exports = {
  routes,
};
