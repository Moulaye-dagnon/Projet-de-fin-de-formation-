import { useContext, useRef, useEffect } from "react";
import { deleteUserFromProject } from "../../api/deleteUserFromProject";
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";
import { toast, ToastContainer } from "react-toastify";
import { updateUserToAdmin } from "../../api/updateUserToAdmin";
import {io} from "socket.io-client"
const socket = io("http://localhost:4000/", { transports: ["websocket"] })

export default function UserAction({
  closeModal,
  userId,
  setOpenModal,
  openModal,
}) {
  const { user } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  function handleDelete() {
    if (
      window.confirm("Voulez-vous vraiment supprimer cet membre du projet?")
    ) {
      deleteUserFromProject(projets._id, user.id, userId);
    }
  }
  function handleUpdate() {
    if (window.confirm("Voulez-vous continuer?")) {
      updateUserToAdmin(projets._id, user.id, userId);
    }
  }
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(null);
      }
    }

    if (openModal !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);
  return (
    <div
      className={`absolute top-full left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10`}
      onClick={closeModal}
      ref={modalRef}
    >
      <div className="bg-slate-200 w-75 h-20 rounded-md">
        <p
          className="hover:bg-slate-300 p-1 rounded-md cursor-pointer"
          onClick={handleDelete}
        >
          Supprimer du projet
        </p>
        <p
          className="hover:bg-slate-300 p-1 rounded-md cursor-pointer"
          onClick={handleUpdate}
        >
          Changer en administrateur
        </p>
      </div>
    </div>
  );
}
