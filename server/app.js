const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute")
const chatRoutes = require("./routes/chatRoute")
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/msg", chatRoutes)


const server = app.listen(process.env.PORT,  () => {
    console.log("server is running")
})

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err.message)
})  

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg)
        }
    })
})