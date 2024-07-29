// socket.js
const socketIo = require('socket.io');
let io;

const initSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

const getSocket = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getSocket };
