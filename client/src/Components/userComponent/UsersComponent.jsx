// import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import UserAction from "../Modals/UserAction";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { ProjectContext } from "../../Context/ProjectContext";

export default function UsersComponent({ user, myId }) {
  const [openModal, setOpenModal] = useState("");

  const { projets } = useContext(ProjectContext);
  const isAdmin = projets.owners?.includes(myId);
  const isAdminn = projets.owners?.includes(user._id);
  const SuperAdmin = projets.superAdmin === myId;
  const isSuperAdminProfile = projets.superAdmin === user._id;
  function closeModal() {
    setOpenModal(!openModal);
  }

  return (
    <div className="rounded-3xl relative   0 w-70 flex flex-col gap-2 border-[#50b1a1] shadow-md hover:shadow-lg transition-all">
      {(SuperAdmin || (!isAdminn && isAdmin)) && !isSuperAdminProfile && (
        <div
          className="header ml-auto cursor-pointer p-4 "
          onClick={() => setOpenModal((c) => !c)}
        >
          <>
            <i className="fas fa-ellipsis-v"></i>
          </>
          {openModal && (
            <UserAction
              userId={user._id}
              closeModal={closeModal}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          )}
        </div>
      )}

      <div className="flex-grow-1 p-4">
        <div className="img">
          {user.photoProfil ? (
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto"
              src={user.photoProfil.url}
              alt="users-photodeProfil"
            />
          ) : (
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto"
              src="/src/assets/fdp.avif"
              alt="users-photodeProfil"
            />
          )}
        </div>
        <p className="text-center text-xl font-semibold text-gray-800 mb-2">
          {user.nom} {user.prenom}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed text-center">
          {user.email}
        </p>
      </div>

      <div className="footer border-slate-900 bg-slate-200 flex-grow-1 rounded-b-lg p-2 text-center">
        <Link to={`/dashboard/users/user/${user._id}`}>
          <p className="cursor-pointer">Voir le profil</p>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
