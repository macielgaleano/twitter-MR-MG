const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const path = require("path");

const userController = {
  welcome: (req, res) => {
    res.render("homeWelcome");
  },
  showLogin: (req, res) => {
    res.render("homeLogin");
  },

  possibleFollowers: async (req, res) => {
    let users = await db.User.find({}).select("_id");
    let users_id = [];
    users.forEach((user) => {
      users_id.push(user._id);
    });
    let foollowing = await db.User.find({
      $and: [
        {
          list_users_following: {
            $nin: users_id,
          },
        },
      ],
    })
      .limit(6)
      .select("_id username name lastname avatar")
      .exec((err, items) => {
        res.json(items);
      });
  },

  showLoginRegistro: (req, res) => {
    res.render("homeLogin");
  },
  follow: async (req, res) => {
    await db.User.findOneAndUpdate(
      { _id: req.params.username },
      {
        $push: {
          list_users_following: await req.params.usernamef,
        },
      }
    ).exec(async (err, post) => {
      await db.User.findOneAndUpdate(
        { _id: req.params.usernamef },
        {
          $push: {
            list_users_followers: await req.params.username,
          },
        }
      );
    });

    res.redirect("/");
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
      avatar: "/images/anonimo.png",
      list_tweets: [],
      list_users_following: [],
      list_users_followers: [],
      description: "Suba una nueva descripcion en configuracion",
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
  configuration: (req, res) => {
    res.render("./pages/configurationPage.ejs", { req: req });
  },

  modifyProfileData: async (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await db.User.findOneAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        description: req.body.description,
        email: req.body.email,
        password: hashedPassword,
      }
    );
    res.redirect("/configuracion");
  },

  modifyProfileImage: async (req, res) => {
    console.log(req.body);
    const form = formidable({
      multiples: true,
      uploadDir: path.dirname(__dirname) + "/public/img",
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      const imagen = "/img/" + path.basename(files.imagen.path);
      db.User.update({ _id: req.user._id }, { avatar: imagen });
      db.save();
    });
    res.redirect("/configuracion");
  },
};

module.exports = userController;
