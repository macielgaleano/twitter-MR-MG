const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.pre(" save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = userSchema;
