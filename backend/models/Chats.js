let mongoose = require("mongoose");
let ChatUtils = require("../utils/ChatUtills");

var chatSchema = new mongoose.Schema({
  ChatID: { type: String, required: [true, "Chat room ID missing"] },
  Date: { type: Date, require: [true, "Date of Chat missing"] },
  from: { type: String, require: [true, "Sender ID missing"] },
  to: { type: String, required: [true, "Reciver ID missing missing"] },
  messageType: { type: String, require: [true, "Message Type missing"] },
  message: { type: String, require: [true, "Message is required"] },
});

chatSchema.statics.SaveMessage = function (messageData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { Date, from, to, messageType, message } = messageData;
      const ChatID = ChatUtils.room(from, to);
      let mymessage = new Chat({
        ChatID,
        Date,
        from,
        to,
        messageType,
        message,
      });

      await mymessage.save();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

chatSchema.statics.LoadMessageHistory = function (from, to) {
  return new Promise(async (resolve, reject) => {
    try {
      let ChatID = ChatUtils.room(from, to);
      let messages = await Chat.find({ ChatID }).exec();
      resolve(messages);
    } catch (err) {
      reject(err);
    }
  });
};

var Chat = mongoose.model("Chats", chatSchema, "chats");

module.exports = Chat;
