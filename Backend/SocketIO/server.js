import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// To listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // To send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));

  // typing indicator: forward to target user only
  socket.on("typing", ({ to, from }) => {
    const recv = users[to];
    if (recv) io.to(recv).emit("userTyping", { from });
  });
  socket.on("stopTyping", ({ to, from }) => {
    const recv = users[to];
    if (recv) io.to(recv).emit("userStopTyping", { from });
  });

  // To listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
