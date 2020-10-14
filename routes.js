const userController = require("./controllers/user.controller");
const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login-registro", userController.showLoginRegistro);

  app.post("/registro", userController.createUser);
  app.post("/login", userController.login);
  app.use("/", isLoggedIn);

  //Profile page

  app.get("/usuario/:username", userController.userPage);

  //Crear data

  app.get("/creardata", seeder.createTweets);

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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
