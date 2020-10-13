const mongoose = require("mongoose");
const tweetSchema = require("./Tweet");
const userSchema = require("./User");

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

const Tweet = mongoose.model("Tweet", tweetSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  mongoose,
  Tweet,
  User,
};
