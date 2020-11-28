const AnonymousChat = require("./controllers/AnonymousChat");
const VentChat = require("./controllers/VentChat/VentChat");

module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("Client Connected  " + socket.id);

    AnonymousChat(socket);

    VentChat(socket);

    socket.on("disconnect", function () {
      console.log("Client Disconected " + socket.id);
    });
  });
};
