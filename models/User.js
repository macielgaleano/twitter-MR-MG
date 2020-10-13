const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  email: String,
  description: String,
  avatar: String,
  list_tweets: [{ content: String, date: Date }],
  list_users_following: [{ username: String }],
  list_users_followers: [{ username: String }],
});
