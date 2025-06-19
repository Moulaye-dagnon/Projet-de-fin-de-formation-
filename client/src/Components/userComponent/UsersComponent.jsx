// import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import UserAction from "../Modals/UserAction";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { ProjectContext } from "../../Context/ProjectContext";
import ErrorModal from "../Modals/ErrorModal";

export default function UsersComponent({ user, myId }) {
  const [openModal, setOpenModal] = useState("");
  const [loading, setLoading] = useState("");
  const { projets } = useContext(ProjectContext);
  const isAdmin = projets.owners?.includes(myId);
  const isAdminn = projets.owners?.includes(user._id);
  const SuperAdmin = projets.superAdmin === myId;
  const isSuperAdmin = projets.superAdmin === user._id;
  function closeModal() {
    setOpenModal(!openModal);
  }
  return (
    <div className="rounded-3xl h-96 w-75 bg-white shadow-lg hover:shadow-xl transition-all">
      <div className="m-4">
        <div className="img w-full h-50">
          {user.photoProfil ? (
            <img
              className="w-full h-full rounded-2xl object-cover mx-auto"
              src={user.photoProfil.url}
              alt="users-photodeProfil"
            />
          ) : (
            <img
              className="w-full h-full rounded-2xl object-cover mx-auto"
              src="/src/assets/noimages.jpg"
              alt="users-photodeProfil"
            />
          )}
        </div>
      </div>

      <div className="">
        {isSuperAdmin && isAdminn && (
          <p className="text-center ">
            <i class="fas fa-crown text-mygreen"></i>
          </p>
        )}

        {!isSuperAdmin && isAdminn && (
          <p className="text-center ">
            <i class="fas fa-user-cog text-mygreen"></i>
          </p>
        )}

        <p className="text-center text-xl font-semibold text-gray-800 mb-2">
          {user.nom} {user.prenom}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed text-center">
          {user.email}
        </p>
      </div>

      <div className="footer mt-2 flex items-center justify-around relative">
        <a
          href={`mailto:${user.email}`}
          class="text-gray-400 hover:text-mygreen block"
        >
          <i className="fas fa-envelope text-xl"></i>
        </a>
        <button className="p-4 rounded-full">
          <Link to={`/dashboard/users/user/${user._id}`}>
            <p className="cursor-pointer">Voir le profil</p>
          </Link>
        </button>
        {(SuperAdmin || (!isAdminn && isAdmin)) && !isSuperAdmin && (
        <div
          className="header cursor-pointer p-4 "
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
              setLoading={setLoading}
            />
          )}
        </div>
      )}
      </div>
      {loading && <ErrorModal />}
      <ToastContainer />
    </div>
  );
}
