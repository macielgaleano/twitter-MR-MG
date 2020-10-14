const db = require("./models/mongoose");
const faker = require("faker");
const { User } = require("./models/mongoose");
const { lorem } = require("faker");

const seeder = {
  createTweets: async () => {
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
      await user.save();
      for (let r = 0; r < 5; r++) {
        let tweet = new db.Tweet({
          content: faker.lorem.words(30),
          author: user._id,
          date_created: faker.date.past(),
          likes: 1,
        });
        await tweet.save();
      }
    }
    let users = await db.User.find({});
    let tweets = await db.Tweet.find({});

    for (let k = 0; k < tweets.length; k++) {
      for (let i = 0; i < users.length; i++) {
        // console.log(typeof users[i]._id + " Id user- " + users[i]._id);
        // console.log(typeof tweets[k].author + " Id autor- " + tweets[k].author);
        if (String(users[i]._id) === String(tweets[k].author)) {
          db.User.findOneAndUpdate(
            { _id: tweets[k].author },
            { $push: { list_tweets: tweets[k]._id } },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
              }
            }
          );
        }
      }
    }

    //MYSTERY HAT
  },
};
module.exports = seeder;
