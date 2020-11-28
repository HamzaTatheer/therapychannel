const ChatUtils = require("../../../utils/ChatUtills");
const DynamicChat = require("../../../models/DynamicChat");
var Chats = require("../../../models/Chats");
var User = require("../../../models/User");
var mongoose = require("mongoose");
var QueueFactory = require("./QueueFactory");
var Moniker = require("moniker");
var AnonymousChat = require("../AnonymousChat");

let ventersQueue = QueueFactory.getVentersQueue();
let listenersQueue = QueueFactory.getListenersQueue();

const getRandomNames = () => {
  let venterName = Moniker.choose();
  let listenerName = Moniker.choose();
  return { venterName, listenerName };
};

module.exports = function (socket) {
  ventersQueue.setComparable((item) => item.id);
  listenersQueue.setComparable((item) => item.id);

  const getVenterListenerPair = () => {
    let pairNotPossible = false;

    if (ventersQueue.isEmpty() || ventersQueue.isEmpty())
      pairNotPossible = true;

    if (pairNotPossible == true) return false;

    let Venter = ventersQueue.dequeue();
    let Listener = listenersQueue.dequeue();
    return { Venter, Listener };
  };

  const isVenterNextInTurn = (venter) => {
    if (ventersQueue.isEmpty()) return false;
    if (ventersQueue.front().id == venter.id) return true;
    else return false;
  };
  const isListenerNextInTurn = (listener) => {
    if (listenersQueue.isEmpty()) return false;
    if (listenersQueue.front().id == listener.id) return true;
    else return false;
  };

  socket.on("joinAsVenter", () => {
    console.log("JOINED AS VENTER");
    socket.join("ventersLobby");
    ventersQueue.enqueue(socket);

    socket.emit("ventersInLine", { length: ventersQueue.length() });
    console.log(ventersQueue.length());

    if (!listenersQueue.isEmpty() && isVenterNextInTurn(socket) == true) {
      console.log("NEW PAIR Linked");
      let selectedVenter = ventersQueue.dequeue();
      let selectedListener = listenersQueue.dequeue();
      socket.in("VentersLobby").emit("moveForwardInQueue");
      const { venterName, listenerName } = getRandomNames();
      selectedVenter.emit("chatStarted", {
        yourname: venterName,
        otherName: listenerName,
        otherId: selectedListener.id,
      });
      selectedListener.emit("chatStarted", {
        yourname: listenerName,
        otherName: venterName,
        otherId: selectedVenter.id,
      });
    }

    socket.on("disconect", () => {
      ventersQueue.leaveQueue(socket);
    });
  });

  socket.on("joinAsListener", () => {
    socket.join("ListenersLobby");
    listenersQueue.enqueue(socket);
    socket.emit("ListenersInLine", { length: listenersQueue.length() });
    console.log(listenersQueue.length());
    if (!ventersQueue.isEmpty() && isListenerNextInTurn(socket) == true) {
      console.log("NEW PAIR Linked");
      let selectedVenter = ventersQueue.dequeue();
      let selectedListener = listenersQueue.dequeue();
      socket.in("ListenersLobby").emit("moveForwardInQueue");
      const { venterName, listenerName } = getRandomNames();
      selectedVenter.emit("chatStarted", {
        yourname: venterName,
        otherName: listenerName,
        otherId: selectedListener.id,
      });
      selectedListener.emit("chatStarted", {
        yourname: listenerName,
        otherName: venterName,
        otherId: selectedVenter.id,
      });
      AnonymousChat();
    }
    socket.on("disconect", () => {
      listenersQueue.leaveQueue(socket);
    });
  });
};
