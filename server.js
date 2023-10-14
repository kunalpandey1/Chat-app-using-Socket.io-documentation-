const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// Notice that I initialize a new instance of socket.io by passing the server (the HTTP server) object.
const io = new Server(server); // initializing input and output streams

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // this is the socket coming from the client side
  socket.on("chat message", (msg) => {
    //Broadcasting
    // The next goal is for us to emit the event from the server to the rest of the users.

    // In order to send an event to everyone, Socket.IO gives us the io.emit() method.
    io.emit("chat message", msg); // broadcasting the message to the rest of the users
    console.log("message : " + msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
