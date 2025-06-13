import { toast } from "react-toastify";
import { base_url } from "./config";
import { io } from "socket.io-client";
const socket = io(`${base_url}`, { transports: ["websocket"] });
export function updateProjectApi(
  userId,
  projectID,
  setOpenUpdateProject,
  navigate,
  data,
  setLoading
) {
  setLoading(true);
  fetch(`${base_url}/project/${userId}/update/${projectID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then((req) => {
      if (!req.ok) throw new Error();
      if (req.status === 200) {
        setTimeout(() => {
          setLoading(false);
          socket.emit("new-project");
          setOpenUpdateProject("");
          navigate("/dashboard");
        }, 1500);
      }
      return req.json();
    })
    .then((res) => {
      toast.success("Projet modifié avec succès");
    })
    .catch((e) => {
      setLoading(false);
      toast.error("Une erreur est survenue!");
      setTimeout(() => {
        setOpenUpdateProject("");
        navigate("/dashboard");
      }, 5000);
    });
}
