import { toast } from "react-toastify";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export const fetchNotif = (notifData) => {
  fetch("http://localhost:4000/new-notification", {
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
