import { toast } from "react-toastify";
import { base_url } from "./config";
import socket from "./socket";

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
