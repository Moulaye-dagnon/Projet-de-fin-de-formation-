import { Outlet, useNavigate } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { io } from "socket.io-client";
import AddProjectModal from "../Modals/AddProjectModal";
import { All_user_project } from "../../api/all_project_by_user";
import { Header } from "../header/header";
import UpdateProject from "../Modals/UpdateProject";
import ErrorModal from "../Modals/ErrorModal";
import { front_url } from "../../api/config";
export function LayoutComponent() {
  const { logout } = useContext(UserContext);
  const { UserProject, setNewProject } = All_user_project();
  useEffect(() => {
    const socket = io(front_url, { transports: ["websocket"] });
    socket.on("add-user", (addUser) => {});
    socket.on("new-project", (newProject) => {
      setNewProject((state) => !state);
    });
    // socket.on("task-change", (newProject) => {
    //   // setNewProject((state) => !state);
    //   console.log("first");
    // });

    return () => {
      socket.off("add-user");
      socket.off("new-project");
      socket.off("fetch-notif");
      socket.off("task-change");
    };
  }, []);

  const [toggleNav, setToggleNav] = useState(false);
  const handleToggleNav = () => {
    setToggleNav((c) => !c);
  };

  const [openAddProject, setOpenAddProject] = useState("");
  const [openUpdateProject, setOpenUpdateProject] = useState("");

  function handleToggleModal() {
    setOpenAddProject(!openAddProject);
  }

  function handleToggleProjectUpdate() {
    setOpenUpdateProject(!openUpdateProject);
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" h-screen w-full min-h-screen max-h-screen flex relative overflow-hidden">
        {toggleNav && (
          <div
            className="absolute inset-0  backdrop-blur-xs z-10 lg:hidden"
            onClick={handleToggleNav}
          />
        )}
        <div
          className={` transition-all duration-300 w-full h-full overflow-hidden  flex-1  grid grid-cols-1  ${
            toggleNav ? "  lg:grid-cols-[200px_1fr]  gap-2" : "grid-cols-1"
          } `}
        >
          <div
            className={`h-full w-[200px] transition-all duration-300 ease-in-out  ${
              toggleNav
                ? "  inset-y-0 left-0 opacity-100 translate-x-0 z-20"
                : " hidden -translate-x-full opacity-100 "
            } absolute lg:static translate-none `}
          >
            <NavComponent
              toggleNav={toggleNav}
              handleToggleModal={handleToggleModal}
              handleToggleProjectUpdate={handleToggleProjectUpdate}
              userProject={UserProject}
              handleToggleNav={handleToggleNav}
              handleLogOut={logout}
            />
          </div>
          <div
            className={` overflow-hidden  flex flex-col gap-y-2 h-screen w-full`}
          >
            <Header handleToggleNav={handleToggleNav} />
            <Outlet />
          </div>
        </div>
        {openAddProject && (
          <AddProjectModal
            openAddProject={openAddProject}
            setOpenAddProject={setOpenAddProject}
          />
        )}
        {openUpdateProject && (
          <UpdateProject
            openUpdateProject={openUpdateProject}
            setOpenUpdateProject={setOpenUpdateProject}
          />
        )}
      </div>
    </DndProvider>
  );
}
