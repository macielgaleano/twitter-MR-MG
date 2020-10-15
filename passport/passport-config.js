const { User } = require("../models/mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password", session: true },
      (email, password, done) => {
        User.findOne({ email: email }).then(async (user, err) => {
          if (err) {
            return done(err);
          }
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              return done(null, user);
            } else {
              done(null, false, { message: "Datos incorrectos" });
            }
          } else {
            return done(null, false, { message: "Datos incorrectos 2." });
          }
        });
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["first_name", "last_name", "email"],
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({email: profile._json.email }, function(err,user){
          if(err) throw(err);
          if(!err && user!= null){
          console.log('user != null');
          return done(null, user);
          }
          let userFacebook = new User({
            name: profile._json.first_name,
            lastname: profile._json.last_name,
            password:"holamundo", 
          })
          userFacebook.save(function(err) {
            if(err) throw err;
            console.log('ok');
            done(null, user);
            });
        }) 
     
      }
    )
  ); 

  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  });
}

module.exports = initialize;
