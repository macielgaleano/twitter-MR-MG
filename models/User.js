const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  email: String,
  description: String,
  avatar: String,
  list_tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  list_users_following: [{ username: String }],
  list_users_followers: [{ username: String }],
});

module.exports = userSchema;
