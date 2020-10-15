const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  //Login, register pages

  app.get("/login-registro", userController.showLoginRegistro);

  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);
  app.get("/home/:id", isLoggedIn, tweetController.home);
  app.use("/", isLoggedIn, tweetController.homeFirst);
  //Profile page
  app.get("/usuario/:username", isLoggedIn, userController.userPage);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  //Delete article
  app.get("/usuario/:tweetId/borrar", isLoggedIn, tweetController.delete);
  app.get("/creardata", seeder.createTweets);

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login-register");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login-registro");
  }
}

module.exports = {
  routes,
};
