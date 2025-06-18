import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { io } from "socket.io-client";
const socket = io(front_url, { transports: ["websocket"] });
import { dateFormat } from "../../Utils/dateFormat";
import { base_url, front_url } from "../../api/config";
export default function TopBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [openNotif, setOpenNotif] = useState("");
  const modalRef = useRef(null);
  const [newNotif, setNewNotif] = useState([]);
  useEffect(() => {
    fetch(`${base_url}/notifications`, {
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
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    socket.on("new-notif", async (updateRoleMessage) => {
      fetch(`${base_url}/notifications/`, {
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
    fetch(`${base_url}/view-notifications/${user.id}`, {
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
        setOpenNotif(null);
      }
    }

    if (openNotif) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNotif]);
  function handleLogout() {
    if (window.confirm("Voulez-vous vraiment vous déconnecter?")) {
      logout();
      navigate("/login");
    }
  }
  const notViewNotifs = newNotif.filter(
    (n) => n.notification?.isView === false
  );
  return (
    <>
      {user && (
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
            <Link to={`/dashboard/users/user/update-user/${user.id}`}>
              {user.photoProfil ? (
                <img
                  src={user.photoProfil.url}
                  alt=""
                  className="w-10 h-10 rounded-full sm:ml-10 cursor-pointer"
                />
              ) : (
                <span className="w-10 h-10 rounded-full sm:ml-10 cursor-pointer bg-[#76b1a6] text-white text-lg flex justify-center items-center font-bold">
                  {user.prenom[0]}
                </span>
              )}
            </Link>
          </div>

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
      )}
    </>
  );
}
