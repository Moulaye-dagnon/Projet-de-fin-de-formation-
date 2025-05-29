import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import StatsComponent from "../../Components/statsComponent/StatsComponent";
import ViewUsersComponent from "../../Components/viewUsersComponent/ViewUsersComponent";
import { fetchProjet } from "../../api/fetchProjet";
import { fetchTasks } from "../../api/fetchTasks";
import { fetchProjectUsers } from "../../api/fetchProjectUsers";
import { ProjectContext } from "../../Context/ProjectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAuth } from "../../api/fetchAuth";

export default function Dashboard({ task }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user, logout, setToken } = useContext(UserContext);
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
    if (!user || user === null) {
      return;
    } else {
      fetchProjet(user, setProjets, removeTwo, removeData, projectId);
    }
  }, [user, projectId]);

  useEffect(() => {
    if (
      !user ||
      user === null ||
      projets === null ||
      !projets ||
      projets === undefined
    ) {
      return;
    } else {
      fetchTasks(projets, setTasks, removeData);
      fetchProjectUsers(projets, setProjectUsers, removeData);
    }
  }, [projets]);
  return (
    <div className="text-center max-w-xl m-auto sm:max-h-screen overflow-auto h-full">
      {Object.keys(projets).length > 0 && tasks?.length >= 0 && (
        <div className="h-full flex flex-col gap-20 items-center py-10">
          <StatsComponent tasks={tasks} />
          {projectUsers && <ViewUsersComponent />}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
