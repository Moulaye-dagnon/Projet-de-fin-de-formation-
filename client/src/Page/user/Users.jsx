import UsersComponent from "../../Components/userComponent/UsersComponent";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
import AddUserComponent from "../../Components/addUserComponent/AddUserComponent";
import UserAction from "../../Components/Modals/UserAction";
import { fetchTasks } from "../../api/fetchTasks";
import { fetchProjectUsers } from "../../api/fetchProjectUsers";
import { fetchProjet } from "../../api/fetchProjet";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
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
  const { user, token, logout } = useContext(UserContext);
  const myId = user.id;

  const ids = projectUsers.map((u) => u._id);

  useEffect(() => {
    socket.on("update-role", (updateRoleMessage) => {
      fetchProjet(user, token, setProjets, removeTwo, removeData, projectId);
    });

    socket.on("delete-user", (deleteUser) => {
      fetchProjet(user, token, setProjets, removeTwo, removeData, projectId);
    });

    return () => {
      socket.off("update-role");
      socket.off("delete-user");
    };
  }, []);

  useEffect(() => {
    if (!token || !user || token === null || user === null) {
      return;
    } else {
      fetchProjet(user, token, setProjets, removeTwo, removeData, projectId);
    }
  }, [user, token, projectId]);

  useEffect(() => {
    if (
      !token ||
      !user ||
      token === null ||
      user === null ||
      projets === null ||
      !projets ||
      projets === undefined
    ) {
      return;
    } else {
      fetchTasks(projets, token, setTasks, removeData);
      fetchProjectUsers(projets, setProjectUsers, removeData);
    }
  }, [projets]);

  const isAdmin = projets.owners?.find((owner) => owner === user.id);
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 place-items-center mt-4 mb-4 sm:h-[calc(90svh-90px)] ">
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
