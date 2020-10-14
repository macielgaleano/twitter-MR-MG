const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");
const passport = require("passport");
 const bcrypt = require("bcryptjs");

const userController = {
  showLogin: (req, res) => {
    res.render("homeWelcome");
  },

    showLoginRegistro: (req, res) => {
        res.render("homeWelcome");
    },

   
    createUser: async (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = await new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword    //?
        });
        user.save().then((user) =>
        req
            .login(user,()=> res.redirect("/"))
           
        ) .catch((error)=> res.redirect("/login-registro"));
        
    },
    login: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-registro",
        
    }),
 
  userPage: async (req, res) => {
    console.log(req.params.username);
    let authorId = await db.User.find({ username: req.params.username }).select(
      "_id"
    );
    res.render("./pages/userPage.ejs", {
      user: await db.User.findOne({ username: req.params.username }).exec(),
      tweets: await db.Tweet.find({ author: authorId }).sort({
        date_created: "desc",
      }),
    });
  },
};

module.exports = userController;
