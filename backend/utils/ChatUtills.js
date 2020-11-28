function getChatID(sender, reciever) {
  const channel = [sender, reciever].sort();
  return channel[0] + "-" + channel[1];
}

function room(from, to) {
  return getChatID(from, to);
}

module.exports.getChatID = getChatID;
module.exports.room = room;
