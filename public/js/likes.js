$(".heart").on("click", function (event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  let position = $(".likes").attr("position");

  let username = $(".likes").attr("username");
  let tweet_id = $(".likes").attr("tweet-id");

  console.log(
    `position ${position} - username: ${username} - tweet_id: ${tweet_id}`
  );
  let url = `${path.join(
    __dirname,
    process.env.APP_PORT
  )}/usuario/${username}/like/${tweet_id}`;

  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
    });
});
