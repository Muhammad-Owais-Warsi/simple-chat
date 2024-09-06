import http from 'http';
import express from 'express';
import path from 'path';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(('./public'))));

io.on("connection",(socket) => {
    console.log("connection established")
    console.log(socket.id)
    socket.on("message",(message) => {
        io.emit("server",message);
        console.log(message);
    })

    socket.on("disconnect",() => {
        console.log("thanks")
    })
})


app.get("/", (req,res) => {
    res.sendFile("./public/index.html");
})


server.listen(3000, () => {
    console.log("start");
})