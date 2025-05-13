import { toast } from "react-toastify";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export function updateUserToAdmin(idproject, id, userId) {
  fetch(`http://localhost:4000/projet/${idproject}/setToAdmin/${id}`, {
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
    .then((res) => {
      socket.emit("update-role");
    })
    .catch((e) => {
      toast.error("Une erreur est survenue!");
    });
}
