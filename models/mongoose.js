const mongoose = require("mongoose");
const tweetSchema = require("./Tweet");

mongoose.connect("mongodb://localhost/twitter", { useNewUrlParser: true });

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {
  mongoose,
  Tweet,
};
