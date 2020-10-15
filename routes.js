const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
<<<<<<< HEAD

  //Home page
  app.get("/welcome", userController.welcome)
  app.get("/", tweetController.allTweets);
  
=======
  //Home page
  app.get("/welcome", userController.welcome);
>>>>>>> c262da080ea93c9c218064d2b839b90b552132a5
  //Login, register pages
  app.get("/usuario/:username", isLoggedIn, userController.userPage);
  app.get("/login-registro", userController.showLoginRegistro);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  //Delete article
  app.get("/usuario/:tweetId/borrar/", isLoggedIn, tweetController.delete);
  app.get(
    "/usuario/:tweetId/borrar/user",
    isLoggedIn,
    tweetController.deleteUser
  );
  app.get("/creardata", isLoggedIn, seeder.createTweets);
  app.post("/tweet/crear", tweetController.createTweets);
  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);
<<<<<<< HEAD

  app.get("/auth/facebook/callback", userController.facebookLogin);
  app.get("/auth/facebook", userController.facebookAuth);
  
  app.get("/home/:id", isLoggedIn, tweetController.home);
  app.use("/", isLoggedIn, tweetController.homeFirst);
  //Profile page
  app.get("/usuario/:username", isLoggedIn, userController.userPage);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  //Delete article
  app.get("/usuario/:tweetId/borrar", isLoggedIn, tweetController.delete);
  app.get("/creardata", seeder.createTweets);

=======
  app.get("/auth/facebook/callback", userController.facebookLogin);
  app.get("/auth/facebook", userController.facebookAuth);
>>>>>>> c262da080ea93c9c218064d2b839b90b552132a5
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login-register");
  });
  app.get("/home/:id", isLoggedIn, tweetController.home);
  app.use("/", isLoggedIn, tweetController.homeFirst);
  //Profile page
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
