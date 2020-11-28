import io from "socket.io-client";

export const socket = () => {
  return io("http://localhost:9000");
};
