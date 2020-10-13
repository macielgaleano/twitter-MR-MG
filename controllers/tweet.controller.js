const db = require("../models/mongoose");
const faker = require("faker");
const { User } = require("../models/mongoose");

const tweetController = {
  createTweets: async (req, res) => {
    for (let i = 0; i < 3; i++) {
      let username = faker.internet.userName();

      let user = new db.User({
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: username,
        email: faker.internet.email(),
        description: faker.lorem.words(40),
        avatar: faker.image.avatar(),
      });
      user.save();
      let tweet = new db.Tweet({
        content: faker.lorem.words(30),
        author: user._id,
        date_created: faker.date.past(),
        likes: 1,
      });
      tweet.save();
    }
  },

  allTweets: async (req, res) => {
    res.json(await db.Tweet.find({}));
  },
};

module.exports = tweetController;

// const tweet = new db.Tweet({
//   title: "Historia de la academia",
//   author: "Hack Academy",
// // });
// tweet.save();
