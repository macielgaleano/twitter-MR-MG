const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
<<<<<<< HEAD
  //Home page
  app.get("/welcome", userController.welcome)
  app.get("/", tweetController.allTweets);
  

=======
>>>>>>> d71653ae4e07c9e4a5ab49bae9cb4e11ea320663
  //Login, register pages
  app.get("/usuario/:username", isLoggedIn, userController.userPage);
  app.get("/login-registro", userController.showLoginRegistro);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  //Delete article
  app.get("/usuario/:tweetId/borrar", isLoggedIn, tweetController.delete);
  app.get("/creardata", isLoggedIn, seeder.createTweets);
  app.post("/tweet/crear", tweetController.createTweets);
  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);
<<<<<<< HEAD
  app.use("/", isLoggedIn);
  app.get("/auth/facebook/callback", userController.facebookLogin);
  app.get("/auth/facebook", userController.facebookAuth);
  
=======
  app.get("/home/:id", isLoggedIn, tweetController.home);
  app.use("/", isLoggedIn, tweetController.homeFirst);
>>>>>>> d71653ae4e07c9e4a5ab49bae9cb4e11ea320663
  //Profile page

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
