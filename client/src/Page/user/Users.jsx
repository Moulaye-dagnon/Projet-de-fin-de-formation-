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
  const isAdmin = projets.owners?.find((owner) => owner === user.id);
  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((req) => {
      if (req.status === 401) {
        logout();
        navigate("/login");
      } else {
        return req.json();
      }
    });
  }, [token]);
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
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 place-items-center mt-4 mb-4">
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
