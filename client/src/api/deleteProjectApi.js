import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { base_url } from "./config";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
export function deleteProjectApi(
  userId,
  projectID,
  setOpenUpdateProject,
  navigate,
  
) {
  fetch(`${base_url}/project/${userId}/delete/${projectID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((req) => {
      if (!req.ok) throw new Error();
      if (req.status === 200) {
        toast.success("Projet supprimé avec succès");
        socket.emit("new-project");
        setTimeout(() => {
          setOpenUpdateProject("");
          navigate("/dashboard");
        }, 5000);
      }
      return req.json();
    })
    .catch((e) => {
      toast.error("Une erreur est survenue!");
      setTimeout(() => {
        setOpenUpdateProject("");
        navigate("/dashboard");
      }, 5000);
    });
}
