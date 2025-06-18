import { io } from "socket.io-client";
import { front_url } from "./config";

const socket = io(front_url, {
  transports: ["websocket"],
});

export default socket;
