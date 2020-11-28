const ChatUtils = require("../utils/ChatUtills");
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = function DynamicChat(CollectionName) {
  var ChatSchema = new Schema({
    from: { type: String, require: [true, "Sender ID missing"] },
    to: { type: String, required: [true, "Reciver ID missing missing"] },
    messageType: { type: String, require: [true, "Message Type missing"] },
    message: { type: String, require: [true, "Message is required"] },
  });

  ChatSchema.statics.SaveMessage = (from, to, messageData) => {
    return new Promise((resolve, reject) => {
      let { messageType, message } = messageData;
      let channel = ChatUtils.getChatID(from, to);
      let chatModel = mongoose.model(channel);
      let chat;
      try {
        chat = new chatModel({ from, to, message, messageType });
      } catch (err) {
        reject(err);
      }

      chat
        .save()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  };

  ChatSchema.statics.LoadMessages = (channel) => {
    return new Promise((resolve, reject) => {
      let chatModel = mongoose.model(channel);
      let chat;
      try {
        chat = new chatModel({ from, to, message, messageType });
      } catch (err) {
        reject(err);
      }

      chatModel.find({}, function (err, docs) {
        if (err) reject(err);
        else resolve(docs);
      });
    });
  };

  console.log("MODEL WITH SCHEMA CREATED");
  return mongoose.model(CollectionName, ChatSchema, CollectionName);
};
