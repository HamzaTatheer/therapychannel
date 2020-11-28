const PrivateChat = require("./controllers/PrivateChat");
const AuthUtils = require("../utils/AuthUtills");

//==============================================Authenticated Socket===============================

const postAuthenticate = (socket, { ClientId }) => {
  console.log("Autheticated Client " + ClientId);
  socket.join(ClientId.toString());
  PrivateChat(socket, ClientId);
};

//=================================================END============================================
function authenticate(socket, data, callback) {
  console.log("Authenticating User..");

  var token = data.token;

  if (token == null) return callback("Token Not Found", false);
  token = token.replace(/^Bearer\s/, "");

  let decoded = AuthUtils.verifyToken(token);

  if (decoded != null) return callback(null, { ClientId: decoded.sub });
  else return callback("Invalid Token Data", false);
}

module.exports = function (io) {
  require("socketio-auth")(io, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
  });
};
