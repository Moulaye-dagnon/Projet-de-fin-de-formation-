import { useState, useContext } from "react";
import Email from "../../Components/Forms/logupInputs/Email";
import Role from "../../Components/Forms/logupInputs/Role";
import Poste from "../../Components/Forms/logupInputs/Poste";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
import { fetchNotif } from "../../api/fetchNotif";

export default function AddUser() {
  const navigate = useNavigate();
  const { projets } = useContext(ProjectContext);
  const [data, setData] = useState({
    email: "",
    role: "",
  });
  const notifData = {
    userMail: data.email,
    type: "invite-user",
    message: "Vous avez été invité à un nouveau projet, veuillez vérifier votre boite mail!",
    date: Date.now()
  };
  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/projet/${projets._id}/adduser/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUserEmail: data.email, role: data.role }),
    })
      .then((req) => {
        if (req.status === 200) {
          toast.success("Membre ajouté avec succès!");
          fetchNotif(notifData);
          socket.emit("fetch-notif");
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        } else if (req.status === 400) {
          toast.error("L'email que vous avez fourni est déjà membre ou a déjà été invité au projet!");
        }
        return req.json();
      })
      .catch((e) => {
        toast.error("Une erreur est survenue!");
      });
  }
  return (
    <div className="text-center pt-5">
      <h1>Ajouter un nouveau membre</h1>
      <form className="flex flex-col gap-3 mt-10 " onSubmit={handleSubmit}>
        <Email data={data} setData={setData} />
        <Role data={data} setData={setData} />
        <button className="btn rounded w-30 p-2 cursor-pointer text-gray-50">
          Ajouter
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
