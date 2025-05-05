import { toast } from "react-toastify";

export function deleteUserFromProject(idproject, id, userId) {
  fetch(`http://localhost:4000/projet/${idproject}/deleteuser/${id}`, {
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
      toast.success("Membre supprimé avec succès");
    })
    .catch((e) => {
      toast.error("Une erreur est survenue!");
    });
}
