import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on('form', (msg) => {
        io.emit("data", msg)
    })
})
server.listen(PORT, () => {
    console.log('server running');
});