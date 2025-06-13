import { toast } from "react-toastify";
import {io} from "socket.io-client"
import { base_url, front_url } from "./config";
const socket = io(`${front_url}`, { transports: ["websocket"] })
export function deleteUserFromProject(idproject, id, userId,setLoading) {
  setLoading(true)
  fetch(`${base_url}/projet/${idproject}/deleteuser/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((req) => {
        if(!req.ok){
            throw new Error()
        }
        return req.json()
    })
    .then((res) => {
      setTimeout(() => {
        socket.emit("delete-user")
        setLoading(false)
      }, 1500);
    })
    .catch((e) => {
      setTimeout(() => {
        setLoading(false)
        toast.error("Une erreur est survenue!");
      }, 1500);
    });
}
