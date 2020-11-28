const ChatUtils = require("../../utils/ChatUtills");
const DynamicChat = require("../../models/DynamicChat");
var Chats = require("../../models/Chats");
var User = require("../../models/User");
var mongoose = require("mongoose");

module.exports = function (socket, ClientId) {
  const room = (sender, reciever) => {
    return ChatUtils.getChatID(sender, reciever);
  };

  socket.on("startmessage", function (data) {
    if (!data) {
      console.log("Conversation Failed");
    }
    console.log("Conversation Started");

    const from = ClientId;
    const to = data.to ? data.to : "undefined";
    console.log(from + " - " + to);
    if (from) {
      socket.join(room(from, to));
      User.addChatingOfUser(from, to);
    }

    socket.on("message", function (data) {
      if (!data) return;

      const from = ClientId;
      const to = data.to ? data.to : "undefined";
      const message = data.message;
      if (to == undefined) return;

      Chats.SaveMessage({
        from,
        to,
        Date: Date.now(),
        messageType: "text",
        message,
      }).then(() => console.log("Message Saved"));

      socket.in(room(from, to)).emit("message", { message: data.message });
    });

    socket.on("endmessage", function (data) {
      if (!data) return;

      const from = ClientId;
      const to = data.to ? data.to : "undefined";
      socket.leave(room(from, to));
    });
  });
};
