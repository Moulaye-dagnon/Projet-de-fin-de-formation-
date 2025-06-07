import UsersComponent from "../../Components/userComponent/UsersComponent";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
import AddUserComponent from "../../Components/addUserComponent/AddUserComponent";
import { fetchTasks } from "../../api/fetchTasks";
import { fetchProjectUsers } from "../../api/fetchProjectUsers";
import { fetchProjet } from "../../api/fetchProjet";
import { io } from "socket.io-client";
import { All_user_project } from "../../api/all_project_by_user";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });
export default function Users() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers,
    removeData,
    removeTwo,
  } = useContext(ProjectContext);
  const { setNewProject } = All_user_project();

  const { user } = useContext(UserContext);
  const myId = user.id;

  const ids = projectUsers.map((u) => u._id);

  useEffect(() => {
    socket.on("update-role", (updateRoleMessage) => {
      fetchProjet(user, setProjets, projectId,navigate);
    });

    socket.on("delete-user", (deleteUser) => {
      // fetchProjet(user, setProjets, removeTwo, removeData, projectId);
      setNewProject((state) => !state);
      navigate("/dashboard");
    });

    return () => {
      socket.off("update-role");
      socket.off("delete-user");
    };
  }, []);

  useEffect(() => {
    if (!user || user === null) {
      return;
    } else {
      fetchProjet(user, setProjets, projectId,navigate);
    }
  }, [user, projectId]);

  useEffect(() => {
    if (!user || !projets) {
      return;
    } else {
      fetchTasks(projets, setTasks, navigate);
      fetchProjectUsers(projets, setProjectUsers, navigate);
    }
  }, [projets]);

  const isAdmin = projets.owners?.find((owner) => owner === user.id);
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 place-items-center mt-4 mb-4 sm:h-[calc(90svh-90px)] overflow-auto">
      {projets && (
        <>
          {projectUsers.map((user) => (
            <UsersComponent key={user._id} user={user} myId={myId} />
          ))}
        </>
      )}
      {isAdmin && <AddUserComponent />}
    </div>
  );
}
