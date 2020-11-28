let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const utils = require("../utils/AuthUtills");
const passport = require("passport");
const ChatUtills = require("../utils/ChatUtills");
const DynamicChat = require("../models/DynamicChat");
const Chats = require("../models/Chats");
const User = require("../models/User");

router.get(
  "/loadMessages/:to",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    let from = req.user.id;
    let to = req.params.to;

    //Whenever User Loads Messages. And User Sends a Okay request back saying that
    //I have recieved the messages well and okay
    //the messages will be deleted in database
    //So it becomes User responsibility to keep and retain messages.
    Chats.LoadMessageHistory(from, to).then((doc) => res.send(doc));
    //    let Chatdb;
    //  try {
    //Chatdb = DynamicChat(ChatUtills.getChatID(from, to));
    //} catch {
    // Chatdb = mongoose.model(ChatUtills.getChatID(from, to));
    //}

    //Chatdb.find({}, function (err, result) {
    //if (err) return;
    //else {
    //res.send(result);
    //}
    //});
  }
);

module.exports = router;
