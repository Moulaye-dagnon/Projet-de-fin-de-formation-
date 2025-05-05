import { toast } from "react-toastify";
export function updateUserToAdmin(idproject, id, userId) {
  fetch(`http://localhost:4000/projet/${idproject}/setToAdmin/${id}`, {
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
        console.log(res)
        toast.success("Ce membre est désormais un administrateur!");
      })
      .catch((e) => {
        console.log(e)
        toast.error("Une erreur est survenue!");
      })
}