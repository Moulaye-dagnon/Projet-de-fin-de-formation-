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
import AddProjectModal from "../Modals/AddProjectModal";
import { All_user_project } from "../../api/all_project_by_user";
import { fetchNotif } from "../../api/fetchNotif";
import { ProjectContext } from "../../Context/ProjectContext";
import { Header } from "../header/header";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
export function LayoutComponent() {
  const { user, token, logout, setToken,setUser } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  const { UserProject, loading, setNewProject } = All_user_project();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("add-user", (addUser) => {
      console.log("first");
    });

    socket.on("new-project", (newProject) => {
      setNewProject((state) => !state);
    });

    return () => {
      socket.off("add-user");
      socket.off("new-project");
      socket.off("fetch-notif");
    };
  }, []);
  const projectID = projets._id
  useEffect(() => {
    fetchAuth(token, logout, navigate,projectID);
  }, [token]);
  const [toggleNav, setToggleNav] = useState(true);
  const handleToggleNav = () => {
    setToggleNav((c) => !c);
  };

  const [openAddProject, setOpenAddProject] = useState("");

  function handleToggleModal() {
    setOpenAddProject(!openAddProject);
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex relative">
        <NavComponent
          toggleNav={toggleNav}
          handleToggleModal={handleToggleModal}
          userProject={UserProject}
          handleToggleNav={handleToggleNav}
        />

        <div
          className={` transition-all duration-300 flex-1 mx-2 border-bg-todo h-svh overflow-hidden border rounded-md`}
        >
          <Header handleToggleNav={handleToggleNav}/>

          <Outlet context={[handleToggleNav]} />
        </div>
        {openAddProject && (
          <AddProjectModal
            openAddProject={openAddProject}
            setOpenAddProject={setOpenAddProject}
          />
        )}
      </div>
    </DndProvider>
  );
}
