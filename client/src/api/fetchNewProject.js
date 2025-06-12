import { toast } from "react-toastify";
import { All_user_project } from "./all_project_by_user";
import { io } from "socket.io-client";
import { base_url } from "./config";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export const fetchNewProject = (
  userId,
  token,
  data,
  setOpenAddProject,
  setLoading
) => {
  setLoading(true);
  fetch(`${base_url}/project/${userId}/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then((req) => {
      if (!req.ok || req.status === 401) {
        throw new Error();
      }
      return req.json();
    })
    .then((res) => {
      toast.success("Projet créer avec succès");
      setTimeout(() => {
        setLoading(false);
        setOpenAddProject("");
        socket.emit("new-project");
      }, 1500);
    })
    .catch((e) => {
      setLoading(false);
      toast.error("Une erreur est survenue!!");
    });
};
