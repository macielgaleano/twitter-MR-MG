const tweetController = require("./controllers/tweet.controller");
const seeder = require("./seeder");

const routes = (app) => {
  //Home page
  app.get("/", tweetController.allTweets);

  //Login, register pages

  app.get("/login", (req, res) => {});
  app.get("/registro", (req, res) => {});
  app.post("/login", (req, res) => {});
  app.post("/registro", (req, res) => {});

  //Profile page

  app.post("/:username", (req, res) => {});

  //Crear data

  app.get("/creardata", seeder.createTweets);
};

module.exports = {
  routes,
};
