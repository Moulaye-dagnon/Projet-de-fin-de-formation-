import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { io } from "socket.io-client";
import { ProjectContext } from "../../Context/ProjectContext";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
import { dateFormat } from "../../Utils/dateFormat";
import { toast } from "react-toastify";

export default function TopBar() {
  const { user, logout, login } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  const [openModal, setOpenModal] = useState("");
  const [openNotif, setOpenNotif] = useState("");
  const modalRef = useRef(null);
  const [newNotif, setNewNotif] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/notifications/${projets._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMail: user.email }),
    })
      .then((req) => {
        if (!req.ok) throw new Error();
        return req.json();
      })
      .then((res) => {
        setNewNotif(res.notifs.notifications);
      })
      .catch((e) => console.log("log"));
  }, []);

  useEffect(() => {
    socket.on("new-notif", async (updateRoleMessage) => {
      fetch(`http://localhost:4000/notifications/${projets._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMail: user.email }),
      })
        .then((req) => {
          if (!req.ok) throw new Error();
          return req.json();
        })
        .then((res) => setNewNotif(res.notifs.notifications))
        .catch((e) => console.log(e));
    });

    return () => {
      socket.off("new-notif");
    };
  }, []);
  function handleOpenNotif() {
    setOpenNotif(!openNotif);
    fetch(`http://localhost:4000/view-notifications/${user.id}`, {
      method: "POST",
    })
      .then((req) => {
        if (!req.ok) throw new Error();
        return req.json();
      })
      .then((res) => socket.emit("new-notif"))
      .catch((e) => console.log("log"));
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(null);
        setOpenNotif(null);
      }
    }

    if (openModal || openNotif) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, openNotif]);
  function handleLogout() {
    if (window.confirm("Voulez-vous vraiment vous déconnecter?")) {
      logout();
    }
  }
  const notViewNotifs = newNotif.filter(
    (n) => n.notification?.isView === false
  );
  return (
    <>
      {user && 
        <div className="flex-grow-0 w-full bg-gray-200 p-1 shadow-md flex items-center">
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
            <Link to={"/dashboard/help"}>
              <i className="fas fa-question cursor-pointer"></i>
            </Link>
            <Link to={"/dashboard/contactus"}>
              <i className="fas fa-envelope cursor-pointer"></i>
            </Link>
            <p className="block relative" onClick={handleOpenNotif}>
              {notViewNotifs?.length > 0 && (
                <span className="text-sm absolute -top-2 -right-3 bg-red-500 text-white font-bold flex justify-center items-center rounded-full w-5 h-5">
                  {notViewNotifs.length}
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
              className="bg-gray-200 absolute right-0 top-18 h-70 w-70 p-5 rounded-xl flex flex-col gap-4 z-10"
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
          {openNotif && (
            <div
              className="bg-gray-200 absolute right-0 top-18 h-40 overflow-auto w-90 p-5 rounded-xl flex flex-col gap-4 z-10"
              ref={modalRef}
            >
              {newNotif?.length > 0 ? (
                newNotif.map((notif) => (
                  <div
                    className="bg-gray-300 p-2 rounded-2xl mb-4"
                    key={notif._id}
                  >
                    <p className="font-bold text-sm block">
                      {dateFormat(notif.notification?.date)}
                    </p>
                    <p className="font-bold text-sm block wrap-break-word">
                      {notif.notification?.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-bold text-center">Aucun nouveau message!</p>
              )}
            </div>
          )}
        </div>
      }
    </>
  );
}
