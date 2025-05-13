import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export default function TopBar() {
  const { user, logout,login } = useContext(UserContext);
  const [openModal, setOpenModal] = useState("");
  const modalRef = useRef(null);
  const [newNotif, setNewNotif] = useState(user.newNotif);
  useEffect(() => {
    socket.on("fetch-notif", async (updateRoleMessage)=>{
      fetch(`http://localhost:4000/notifications/${user.id}`, {
        method: "GET",
      }).then(req=>req.json()).then(res=> setNewNotif(res.notifs))
    })

    return () => {
      socket.off("fetch-notif");
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(null);
      }
    }

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);
  function handleLogout() {
    if (window.confirm("Voulez-vous vraiment vous déconnecter?")) {
      logout();
    }
  }
  return (
    <div className="flex-grow-0 w-full bg-gray-200 p-1 shadow-md z-10 flex items-center">
      <div className="text-2xl ">
        <NavLink to={"/dashboard"}>
          <img
            src="/favicon2.png"
            alt="logo"
            className="cursor-pointer w-14 h-14 pl-2 inline"
          />
        </NavLink>
        <p className="sm:inline text-sm ml-2 hidden">
          Gestion de projet collaboratif
        </p>
      </div>
      <div className={`ml-auto pr-2 flex items-center sm:gap-10 gap-8`}>
        <i className="fas fa-search cursor-pointer"></i>
        <i className="fas fa-question cursor-pointer"></i>
        <i className="fas fa-user-plus cursor-pointer"></i>
        <p className="block relative">
          {newNotif?.length > 0 && (
            <span className="text-sm absolute -top-2 -right-3 bg-red-500 text-white font-bold flex justify-center items-center rounded-full w-5 h-5">
              {newNotif.length}
            </span>
          )}
          <i className="fas fa-bell cursor-pointer"></i>
        </p>
        {user.photoProfil ? (
          <img
            src={`http://localhost:4000/images/${user.photoProfil}`}
            alt=""
            className="w-10 h-10 rounded-full sm:ml-10 cursor-pointer"
            onClick={() => setOpenModal(!openModal)}
          />
        ) : (
          <span
            className="w-10 h-10 rounded-full sm:ml-10 cursor-pointer bg-[#76b1a6] text-white text-lg flex justify-center items-center font-bold"
            onClick={() => setOpenModal(!openModal)}
          >
            {user.prenom[0]}
          </span>
        )}
      </div>
      {openModal && (
        <div
          className="bg-gray-200 absolute right-0 top-18 h-70 w-70 p-5 rounded-xl flex flex-col gap-4"
          ref={modalRef}
        >
          <div className="flex items-center gap-4">
            <i className="fas fa-user"></i>
            <p>
              {user.prenom} {user.nom}
            </p>
            <p></p>
          </div>

          <div className="flex items-center gap-4">
            <i className="fas fa-sign-out-alt"></i>
            <p className="cursor-pointer underline" onClick={handleLogout}>
              Se déconnecter
            </p>
          </div>

          <div
            className="text-center border-t mt-auto"
            onClick={() => setOpenModal(!openModal)}
          >
            <Link to={`/dashboard/users/user/${user.id}`}>
              <p className="cursor-pointer">Voir mon profil</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
