import { toast } from "react-toastify";
import { base_url, front_url } from "./config";
import { io } from "socket.io-client";
const socket = io(`${front_url}`, { transports: ["websocket"] });

export function removeUserToAdmin(idproject, id, userId, setLoading) {
  setLoading(true);
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
      setTimeout(() => {
        socket.emit("update-role");
        setLoading(false);
      }, 1500);
    })
    .catch(() => {
      setTimeout(() => {
        toast.error("Une erreur est survenue!");
        setLoading(false);
      }, 1500);
    });
}
