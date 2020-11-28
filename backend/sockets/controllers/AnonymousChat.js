const ChatUtils = require("../../utils/ChatUtills");
const DynamicChat = require("../../models/DynamicChat");
var Chats = require("../../models/Chats");
var User = require("../../models/User");
var mongoose = require("mongoose");

module.exports = function (socket) {
  const room = (sender, reciever) => {
    return ChatUtils.getChatID(sender, reciever);
  };

  socket.on("startAnonymousChat", function (data) {
    //Contact Authenticator Class for chat security
    const from = socket.id;
    const to = data.to ? data.to : "undefined";
    socket.join(room(from, to));

    socket.on("message", function (data) {
      if (!data) return;

      //      let mydata = JSON.parse(data);
      //      data = mydata;

      const from = socket.id;
      const to = data.to ? data.to : "undefined";
      const message = data.message;
      if (to == undefined) return;
      socket.in(room(from, to)).emit("message", { message: data.message });
    });

    socket.on("endAnonymousChat", function (data) {
      if (!data) return;
      let mydata = JSON.parse(data);
      data = mydata;

      const from = socket.id;
      const to = data.to ? data.to : "undefined";
      socket.leave(room(from, to));
    });
  });
};
