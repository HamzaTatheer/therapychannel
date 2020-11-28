let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const User = require("mongoose").model("User");
const Therapist = require("mongoose").model("Therapist");
const utils = require("../utils/AuthUtills");
const passport = require("passport");
const ChatUtills = require("../utils/ChatUtills");
const DynamicChat = require("../models/DynamicChat");

router.get("/editProfile", function (req, res) {
  console.log("/editProfile");
  //get req.body and make calls to edit the stuff required eg dob,name,password, pfp
  res.send("/editProfile");
});

module.exports = router;
