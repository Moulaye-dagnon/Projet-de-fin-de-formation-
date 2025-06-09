import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { base_url } from "./config";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export function removeUserToAdmin(idproject, id, userId) {
  fetch(`${base_url}/projet/${idproject}/removeToAdmin/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((req) => {
      if (!req.ok) {
        throw new Error();
      }
      return req.json();
    })
    .then(() => {
      socket.emit("update-role");
    })
    .catch(() => {
      toast.error("Une erreur est survenue!");
    });
}
