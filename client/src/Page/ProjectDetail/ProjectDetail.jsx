import { BoardItemComponent } from "../../Components/BoardItem/BoardItemComponent";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { base_url } from "../../api/config";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import { AddTaskComponent } from "../../Components/addTaskComponent/AddTaskComponent";
import { Patch_api } from "../../api/api";
import {
  AllTasksContextProvider,
  UseAllTasksContext,
} from "../../Context/AllTaskContext";
import { FiSidebar } from "react-icons/fi";

import Dashboard from "../dashboard/Dashboard";
import { Header } from "../../Components/header/header";
import { SortByPriorityAndOrder } from "../../Utils/getTryByPriority";
import { CustomDragLayer } from "../../Components/CustomDraglayer/CustomDraglayer";
export function ProjectDetail() {
  const [activeTask, setActiveTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const { projectId } = useParams();

  const [data, setData] = useState(null);
  const { token } = useContext(UserContext);
  const { alltasks, setAllTasks } = UseAllTasksContext();
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
  }, [projectId, token]);
  const handlerIconPlus = (e) => {
    e.preventDefault();

    setActiveTask((c) => true);
  };
  const todo = SortByPriorityAndOrder(
    alltasks.filter((task) => task.status === "todo")
  );
  const doing = SortByPriorityAndOrder(
    alltasks.filter((task) => task.status === "doing")
  );
  const done = SortByPriorityAndOrder(
    alltasks.filter((task) => task.status === "done")
  );
  return (
    <>
      {data ? (
        <>
          <CustomDragLayer />
          <div className=" w-full overflow-hidden overflow-x-auto flex-1    flex items-center flex-col h-full  ">
            {/* <Header /> */}
            <div className="h-[calc(100svh - 80px)] lg:h-[calc(100svh-96px)]  w-full h-full ">
              <div className="w-full h-full overflow-x-auto ">
                <div className="flex h-full overflow-x-auto gap-3 px-2 min-w-0">
                  <BoardItemComponent
                    title={"À faire"}
                    tasks={todo}
                    project_name={data.Project}
                    columnid="todo"
                    handlerIconPlus={handlerIconPlus}
                    color={"rgba(249, 115, 22, 0.063)"}
                  />

                  <BoardItemComponent
                    title={"En cours"}
                    tasks={doing}
                    project_name={data.Project}
                    columnid="doing"
                    handlerIconPlus={handlerIconPlus}
                    color={"rgba(250, 204, 21, 0.063)"}
                  />

                  <BoardItemComponent
                    title={"Terminé"}
                    tasks={done}
                    project_name={data.Project}
                    columnid="done"
                    handlerIconPlus={handlerIconPlus}
                    color={"rgba(139, 92, 246, 0.063)"}
                  />
                </div>
              </div>
            </div>
          </div>
          {activeTask && <AddTaskComponent setToggle={setActiveTask} />}
        </>
      ) : (
        <h1>Chargement...</h1>
      )}
    </>
  );
}
