
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(express.json());

const io = socketio(server);
io.on("connection", client => {
    client.on("message", message => {
        io.emit("new message", message);
    });
});

server.listen(4000, () => {
    console.log("listen...");
});