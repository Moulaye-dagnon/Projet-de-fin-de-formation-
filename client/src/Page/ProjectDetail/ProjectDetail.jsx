import { BoardItemComponent } from "../../Components/BoardItem/BoardItemComponent";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { base_url } from "../../api/config";
import { UserContext } from "../../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { AddTaskComponent } from "../../Components/addTaskComponent/AddTaskComponent";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import { SortByPriorityAndOrder } from "../../Utils/getTryByPriority";
import { CustomDragLayer } from "../../Components/CustomDraglayer/CustomDraglayer";
import { isAdmin } from "../../Utils/isCanChagetStatusOrPriority";
import { ProjectContext } from "../../Context/ProjectContext";
import { ToastContainer } from "react-toastify";
import { fetchProjet } from "../../api/fetchProjet";
import { fetchTasks } from "../../api/fetchTasks";
import { fetchProjectUsers } from "../../api/fetchProjectUsers";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";
import ErrorModal from "../../Components/Modals/ErrorModal";
import socket from "../../api/socket";

export function ProjectDetail() {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState(null);
  const { projectId } = useParams();
  const [data, setData] = useState(null);
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { projets, setProjets, setTasks, setProjectUsers } =
    useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState("");
  useEffect(() => {
    socket.on("task-change", (e) => {
      async function fetchProject() {
        try {
          const response = await axios.get(
            `${base_url}/tasks/project/${projectId}`
          );
          const result = await response.data;
          setData(result);
          const allTasks = [];
          result.tasks.forEach((group) => {
            group.tasks.forEach((task) => {
              allTasks.push({ ...task, status: group._id });
            });
          });
          setAllTasks(allTasks);
        } catch (error) {
          console.log("Erreur:", error);
        }
      }
      fetchProject();
    });

    return () => {
      socket.off("task-change");
    };
  }, []);
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.get(
          `${base_url}/tasks/project/${projectId}`
        );
        const result = await response.data;
        setData(result);
        const allTasks = [];
        result.tasks.forEach((group) => {
          group.tasks.forEach((task) => {
            allTasks.push({ ...task, status: group._id });
          });
        });
        setAllTasks(allTasks);
      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!user || user === null) {
      return;
    } else {
      fetchProjet(user, setProjets, projectId, navigate, setLoading);
    }
  }, [user, projectId]);

  useEffect(() => {
    if (!user || !projets) {
      return;
    } else {
      fetchTasks(projets, setTasks, navigate, setLoading);
      fetchProjectUsers(projets, setProjectUsers, navigate, setLoading);
    }
  }, [projets]);

  const handlerIconPlus = (e) => {
    e.preventDefault();

    setActiveTask(() => true);
  };
  const todo = useMemo(
    () =>
      SortByPriorityAndOrder(alltasks.filter((task) => task.status === "todo")),
    [alltasks]
  );
  const doing = useMemo(
    () =>
      SortByPriorityAndOrder(
        alltasks.filter((task) => task.status === "doing")
      ),
    [alltasks]
  );
  const paused = useMemo(
    () =>
      SortByPriorityAndOrder(
        alltasks.filter((task) => task.status === "paused")
      ),
    [alltasks]
  );
  const done = useMemo(
    () =>
      SortByPriorityAndOrder(alltasks.filter((task) => task.status === "done")),
    [alltasks]
  );
  return (
    <>
      {data ? (
        <>
          <CustomDragLayer />

          <div className=" overflow-x-auto  flex-1 flex items-center flex-col h-[calc(100%-104px)] w-full ">
            <div className="w-full h-full  ">
              <div className="flex gap-3 px-2 h-full min-w-max ">
                <BoardItemComponent
                  title={"À faire"}
                  tasks={todo}
                  columnid="todo"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(249, 115, 22, 0.063)"}
                />

                <BoardItemComponent
                  title={"En cours"}
                  tasks={doing}
                  columnid="doing"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(250, 204, 21, 0.063)"}
                />

                <BoardItemComponent
                  title={"Terminé"}
                  tasks={done}
                  columnid="done"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(139, 92, 246, 0.063)"}
                />
                <BoardItemComponent
                  title={"En pause"}
                  tasks={paused}
                  columnid="paused"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(14, 165, 233, 0.063)"}
                />
              </div>
            </div>
          </div>

          {activeTask && isAdmin({ user, projets }) && (
            <AddTaskComponent setToggle={setActiveTask} />
          )}
        </>
      ) : (
        <SpinnerComponent />
      )}
      {loading && <ErrorModal />}
      <ToastContainer />
    </>
  );
}
