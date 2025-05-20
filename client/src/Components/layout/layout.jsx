import { Outlet, useNavigate } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { fetchAuth } from "../../api/fetchAuth";
import TopBar from "../topBarComponent/TopBar";
import { fetchProjet } from "../../api/fetchProjet";
import { io } from "socket.io-client";
import { Header } from "../header/header";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
export function LayoutComponent() {
  const { user, token, logout, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("add-user", (addUser) => {
      fetchProjet(user, token, setProjets, removeTwo, removeData, projectId);
    });

    return () => {
      socket.off("add-user");
    };
  }, []);
  useEffect(() => {
    fetchAuth(token, logout, navigate);
  }, [token]);
  const [toggleNav, setToggleNav] = useState(true);
  const handleToggleNav = () => {
    setToggleNav((c) => !c);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" flex   relative min-h-screen ">
        <NavComponent toggleNav={toggleNav} />

        <div
          className={` transition-all duration-300 flex-1 flex flex-col   mx-2 border-bg-todo  h-svh overflow-hidden w-full border rounded-md ${
            toggleNav ? "ml-52" : ""
          }`}
        >
          <Header handleToggleNav={handleToggleNav} />
          <Outlet context={[handleToggleNav]} />
        </div>
      </div>
    </DndProvider>
  );
}
