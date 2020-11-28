let express = require("express");
let router = express.Router();

router.get("/show_posts", function (req, res) {
  console.log("/show_posts");
  //get user and return obj containing all of his appointments including doctor details.
  res.send("/show_posts");
});

router.get("/create_post", function (req, res) {
  console.log("/create_post");
  //get user and return obj containing all of his appointments including doctor details.
  res.send("/create_post");
});

router.get("/like_post", function (req, res) {
  console.log("/like_post");
  //get user and return obj containing all of his appointments including doctor details.
  res.send("/like_post");
});

router.get("/comment_post", function (req, res) {
  console.log("/comment_post");
  //get user and return obj containing all of his appointments including doctor details.
  res.send("/comment_post");
});

module.exports = router;
