const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  app.use("/", isLoggedIn, tweetController.homeFirst); //It's necesary fix them
  app.get("/welcome", userController.welcome);

  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);

  //Login, register pages
  app.get("/login-registro", userController.showLoginRegistro);

  //User functions backend
  app.get("/usuario/:tweetId/borrar/", isLoggedIn, tweetController.delete);
  app.post("/tweet/crear", tweetController.createTweets);

  //User functions
  app.get("/configuracion", isLoggedIn, userController.configuration);
  app.get("/pagination/:id", isLoggedIn, tweetController.pagination);

  //For fetch calls
  app.get("/possibleFollowers", userController.possibleFollowers);

  //Passport auths
  app.get("/auth/facebook/callback", userController.facebookLogin);
  app.get("/auth/facebook", userController.facebookAuth);
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login-register");
  });

  //Profile page
  app.get("/usuario/:username", userController.userPage);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  app.get("/usuario/:tweetId/borrar", isLoggedIn, tweetController.delete);

  //Seeder
  app.get("/creardata", seeder.createTweets);
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
