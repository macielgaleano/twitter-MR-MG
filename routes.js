const tweetController = require("./controllers/tweet.controller");
const userController = require("./controllers/user.controller");
const seeder = require("./seeder");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login-registro", userController.showLoginRegistro);
  
  app.post("/registro",  userController.createUser);
  app.post("/login", userController.login);
  app.use("/", isLoggedIn);

  //Profile page

  app.post("/:username", (req, res) => {});

  //Crear data

  app.get("/creardata", seeder.createTweets);
};

module.exports = {
  routes,
};
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}