const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  app.get("/", isLoggedIn, tweetController.homeFirst); //It's necesary fix them
  app.get("/welcome", userController.welcome);

  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);

  //Login, register pages
  app.get("/login-registro", userController.showLoginRegistro);

  //User functions backend
  app.get("/usuario/:tweetId/borrar/", isLoggedIn, tweetController.delete);
  app.get("/creardata", isLoggedIn, seeder.createTweets);
  app.post("/tweet/crear", tweetController.createTweets);

  //User functions
  app.get("/configuracion", isLoggedIn, userController.configuration);
  app.post("/usuario/configuracion/imagen"),
    isLoggedIn,
    userController.modifyProfileImage;
  app.post(
    "/usuario/configuracion/datos",
    isLoggedIn,
    userController.modifyProfileData
  );
  app.get("/pagination/:id", isLoggedIn, tweetController.pagination);

  //For fetch calls
  app.get("/possiblefollowers", userController.possibleFollowers);

  //Passport auths
  app.get("/auth/facebook/callback", userController.facebookLogin);
  app.get("/auth/facebook", userController.facebookAuth);

  //Profile page
  app.get("/usuario/:username", userController.userPage);
  app.get("/usuario/:username/like", isLoggedIn, userController.like);
  //Delete article
  app.get("/usuario/:tweetId/borrar", isLoggedIn, tweetController.delete);
  app.get("/creardata", seeder.createTweets);
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login-registro");
  });

  app.get("/", isLoggedIn, tweetController.homeFirst);
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
