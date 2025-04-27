import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import StatsComponent from "../StatsComponent";
import ViewUsersComponent from "../ViewUsersComponent";
import { fetchProjet } from "../../Utils/fetchProjet";
import { fetchTasks } from "../../Utils/fetchTasks";
import { fetchProjectUsers } from "../../Utils/fetchProjectUsers";
import { ProjectContext } from "../../Context/ProjectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, token, logout, setToken } = useContext(UserContext);
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
  useEffect(() => {
    try {
      fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((req) => {
        if (req.status === 401) {
          logout();
          navigate("/login")
          return;
        } else {
          toast.success(`Bienvenue ${user.prenom} ${user.nom}`)
          return req.json();
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    if (!token || !user || token === null || user === null) {
      return;
    } else {
      fetchProjet(user, token, setProjets, removeTwo, removeData);
    }
  }, [user, token]);

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
      fetchProjectUsers(projets, setProjectUsers, removeData);
      fetchTasks(projets, token, setTasks, removeData);
    }
  }, [projets]);
  return (
    <div className="text-center">
      {token && <p>{user.email}</p>}

      {Object.keys(projets).length > 0 && tasks?.length >= 0 && (
        <div className="flex justify-around flex-col sm:flex-row items-center  gap-5 p-4">
          <StatsComponent />
          {projectUsers && <ViewUsersComponent />}
        </div>
      )}
      <ToastContainer/>
    </div>
  );
}
