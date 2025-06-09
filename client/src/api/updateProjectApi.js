import { toast } from "react-toastify";
import { base_url } from "./config";

export function updateProjectApi(
  userId,
  projectID,
  setOpenUpdateProject,
  navigate,
  data
) {
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
        toast.success("Projet modifié avec succès");
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
