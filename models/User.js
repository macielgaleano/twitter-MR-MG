const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  description: String,
  avatar: String,
  list_tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  list_users_following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  list_users_followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = userSchema;
