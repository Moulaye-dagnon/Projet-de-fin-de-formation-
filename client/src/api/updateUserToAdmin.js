import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { base_url } from "./config";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export function updateUserToAdmin(idproject, id, userId, setLoading) {
  setLoading(true);
  fetch(`${base_url}/projet/${idproject}/setToAdmin/${id}`, {
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
        setLoading(false);
        socket.emit("update-role");
      }, 1500);
    })
    .catch(() => {
      setTimeout(() => {
        setLoading(false);
        toast.error("Une erreur est survenue!");
      }, 1500);
    });
}
