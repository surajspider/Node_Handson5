const express = require("express");
const socket = require("socket.io");
const PORT = 4500;
const app = express();

app.get("/", (req, res) => {
    res.send("API is running fine!");
})

const server = app.listen(PORT, () => {
    try {
        console.log("Listening on Port ,", PORT);
    }
    catch (err) {
        console.log("Error Occurred:", err);
    }
})

const io = socket(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socketClient) => {
    try {
        console.log(socketClient.id);
        socketClient.on("broadCast", (broadcastmsg) => {
            console.log(broadcastmsg);
            socketClient.broadcast.emit("broadCast", broadcastmsg);
        })
    }
    catch (err) {
        console.log("Error Occurred:", err);
    }
})