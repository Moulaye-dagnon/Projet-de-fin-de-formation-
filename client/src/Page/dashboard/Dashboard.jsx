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

export default function Dashboard({ task }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user} = useContext(UserContext);
  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers,
  } = useContext(ProjectContext);

  useEffect(() => {
    if (!user || user === null) {
      return;
    } else {
      fetchProjet(user, setProjets, projectId, navigate);
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
  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className=" text-center mx-auto   ">
        {Object.keys(projets).length > 0 && tasks?.length >= 0 && (
          <div className="h-full flex flex-col gap-y-20 items-center py-10">
            <StatsComponent tasks={tasks} />
            {projectUsers && <ViewUsersComponent />}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
