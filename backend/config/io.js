var express = require("express");
var socketio = require("socket.io");
var PrivateChat = require("../sockets/Authenticated");
var VentChat = require("../sockets/controllers/VentChat/VentChat");
var ConnectionStatus = require("../sockets/UnAuthenticated");
var http = require("http");

module.exports = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use("/static", express.static("node_modules"));

  //PrivateChat(io);
  //VentChat(io);

  ConnectionStatus(io);

  server.listen(9000, () => {
    console.log("Server has started lisenting on port 9000");
  });
};
