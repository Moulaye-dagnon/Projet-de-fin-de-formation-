import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { base_url } from "./config";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export const fetchNotif = (notifData) => {
  fetch(`${base_url}/new-notification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notifData),
  })
    .then((req) => {
      if (!req.ok) throw new Error();
      socket.emit("new-notif");
      return req.json();
    })
    .catch((e) => toast.error("Erreur!"));
};
