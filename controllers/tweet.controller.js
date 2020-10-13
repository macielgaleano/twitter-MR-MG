const db = require("../models/mongoose");

const tweet = new db.Tweet({
  title: "Historia de la academia",
  author: "Hack Academy",
});

tweet.save();
