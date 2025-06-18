import { toast } from "react-toastify";
import { base_url } from "./config";
import socket from "./socket";
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
