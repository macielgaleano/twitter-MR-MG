require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { routes } = require("./routes");

// Configuracion app
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs", "formidable");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

const db = require("./models/mongoose");

const tweet = new db.Tweet({
  content: "Historia de la academia",
  author: "Hack Academy",
});

tweet.save();

app.listen(process.env.APP_PORT, () =>
  console.log(`App on: http://localhost:${process.env.APP_PORT}`)
);
