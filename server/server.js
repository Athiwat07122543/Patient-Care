import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();

const server = createServer(app);
const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.URL];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on('form', (msg) => {
    io.emit("data", msg)
  })
})
server.listen(PORT, () => {
  console.log('server running');
});