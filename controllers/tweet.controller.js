const db = require("../models/mongoose");
const faker = require("faker");

const tweetController = {
  createTweets: (req, res) => {
    for (let i = 0; i < 50; i++) {
      const user = new db.User({
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        description: faker.lorem.words(40),
        avatar: faker.image.avatar,
      });
      user.save();
      const tweet = new db.Tweet({
        title: "Historia de la academia",
        author: "Hack Academy",
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
