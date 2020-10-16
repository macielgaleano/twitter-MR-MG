const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const userController = {
  welcome: (req, res) => {
    res.render("homeWelcome");
  },
  showLogin: (req, res) => {
    res.render("homeLogin");
  },

  showLoginRegistro: (req, res) => {
    res.render("homeLogin");
  },
  like: async (req, res) => {
    let user = await db.User.find({ username: req.params.username });
  },
  createUser: async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, //?
      avatar: "Sin imagen",
      list_tweets: [],
      list_users_following: [],
      list_users_followers: [],
    });
    user
      .save()
      .then((user) => req.login(user, () => res.redirect("/login-registro")))
      .catch((error) => res.redirect("/login-registro"));
  },
  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-registro",
  }),
  facebookLogin: passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login-registro",
  }),
  facebookAuth: passport.authenticate("facebook", { scope: "email" }),

  userPage: async (req, res) => {
    let authorId = await db.User.find({ username: req.params.username }).select(
      "_id"
    );
    res.render("./pages/userPage.ejs", {
      user: await db.User.findOne({ username: req.params.username }).exec(),
      tweets: await db.Tweet.find({ author: authorId }).sort({
        date_created: "desc",
      }),
      req: req,
    });
  },
};

module.exports = userController;
