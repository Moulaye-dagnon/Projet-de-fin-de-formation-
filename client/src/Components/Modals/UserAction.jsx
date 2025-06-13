import { useContext, useRef, useEffect, useState } from "react";
import { deleteUserFromProject } from "../../api/deleteUserFromProject";
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";
// import { toast, ToastContainer } from "react-toastify";
import { updateUserToAdmin } from "../../api/updateUserToAdmin";
import { io } from "socket.io-client";
import { removeUserToAdmin } from "../../api/RemoveUserToAdmin";
import ErrorModal from "./ErrorModal";
import { ToastContainer } from "react-toastify";
import { front_url } from "../../api/config";
io(front_url, { transports: ["websocket"] });

export default function UserAction({
  closeModal,
  userId,
  setOpenModal,
  openModal,
  setLoading
}) {
  const { user } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  const isAdminn = projets.owners?.includes(userId);

  const SuperAdmin = projets.superAdmin === user.id;

  function handleDelete() {
    if (
      window.confirm("Voulez-vous vraiment supprimer cet membre du projet?")
    ) {
      deleteUserFromProject(projets._id, user.id, userId, setLoading);
    }
  }
  function handleUpdate() {
    if (window.confirm("Voulez-vous continuer?")) {
      updateUserToAdmin(projets._id, user.id, userId, setLoading);
    }
  }
  function handleRemoveToAdmin() {
    if (window.confirm("Voulez-vous continuer?")) {
      removeUserToAdmin(projets._id, user.id, userId, setLoading);
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
  });
  return (
    <div
      className={`absolute top-10 left-2 mt-2 w-full bg-white border rounded shadow-lg z-10`}
      onClick={closeModal}
      ref={modalRef}
    >
      <div className="bg-slate-200 w-full h-20 rounded-md">
        <p
          className="hover:bg-slate-300 p-1 rounded-md cursor-pointer"
          onClick={handleDelete}
        >
          Supprimer du projet
        </p>
        <p
          className="hover:bg-slate-300 p-1 rounded-md cursor-pointer"
          onClick={isAdminn && SuperAdmin ? handleRemoveToAdmin : handleUpdate}
        >
          {isAdminn && SuperAdmin
            ? "Supprimer de l'admin"
            : "Changer en administrateur"}
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}
