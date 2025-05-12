import { Outlet, useNavigate } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { fetchAuth } from "../../api/fetchAuth";
import TopBar from "../topBarComponent/TopBar";
import { fetchProjet } from "../../api/fetchProjet";
import { io } from "socket.io-client";
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
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col">
        <TopBar />
        <div className="flex-grow-1 flex">
          <NavComponent />
          <div className="flex-1 px-6 overflow-x-scroll h-full bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
