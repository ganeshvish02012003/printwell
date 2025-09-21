// io.js
let ioInstance;

function init(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL, credentials: true },
  });

  ioInstance.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });

  return ioInstance;
}

function getIO() {
  if (!ioInstance) throw new Error("Socket.IO not initialized yet!");
  return ioInstance;
}

module.exports = { init, getIO };
