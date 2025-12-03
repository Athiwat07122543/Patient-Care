import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_URL, {
  autoConnect: true,
});
// const socket = io("http://localhost:3001", {
//   autoConnect: true,
// });

export default socket;
