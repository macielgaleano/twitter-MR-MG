require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const passport = require("passport");
const { routes } = require("./routes");

// Configuracion app
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const initialize = require("./passport/passport-config");
initialize(passport);
routes(app);

app.listen(process.env.APP_PORT, () =>
  console.log(`App on: ${path.join(__dirname, process.env.APP_PORT)}`)
);
