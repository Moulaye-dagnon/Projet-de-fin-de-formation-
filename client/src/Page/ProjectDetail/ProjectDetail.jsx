import { BoardItemComponent } from "../../Components/BoardItem/BoardItemComponent";
import iconMenuPoint from "../../assets/menu-point.svg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { base_url } from "../../api/config";
import { UserContext } from "../../Context/UserContext";
import iconPerson from "../../assets/person.svg";
import DropdownComponent from "../../Components/dropdowmCoponent/DropdownComponent";
import { useParams } from "react-router-dom";
import { AddTaskComponent } from "../../Components/addTaskComponent/AddTaskComponent";
import { Patch_api } from "../../api/api";
import { use_fetch_all_tasks } from "../../api/all_tasks_in_project";
import { useDragLayer } from "react-dnd";
import {
  AllTasksContextProvider,
  UseAllTasksContext,
} from "../../Context/AllTaskContext";

import Dashboard from "../dashboard/Dashboard";
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
  const todo = alltasks
    .filter((task) => task.status === "todo")
    .sort((a, b) => a.order - b.order);
  const doing = alltasks
    .filter((task) => task.status === "doing")
    .sort((a, b) => a.order - b.order);
  const done = alltasks
    .filter((task) => task.status === "done")
    .sort((a, b) => a.order - b.order);
  const columns = ["todo", "doing", "done"];
  return (
    <>
      {data ? (
        <>
          {/* <Dashboard task={tasks} /> */}
          <div className="flex flex-col h-full min-w-3xl">
            <div>tableau</div>
            <hr />
            <div className="mb-5 mt-3">Tableau</div>

            <div className="flex justify-center gap-x-10 h-[100svh-24px] overflow-x-auto">
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
          <CustomDragLayer />
          {activeTask && <AddTaskComponent setToggle={setActiveTask} />}
        </>
      ) : (
        <h1>Chargement...</h1>
      )}
    </>
  );
}

const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: 0,
        top: 0,
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        width: "282px",
      }}
    >
      <div
        className={`bg-white w-full p-5 rounded-2xl m-3 absolute cursor-move isdragging `}
      >
        <div className="relative ">
          <span className="text-[8px]">Project name</span>
          <span className=" cursor-pointer">
            <img
              className=" absolute top-2 right-0"
              src={iconMenuPoint}
              alt=""
            />
          </span>
        </div>
        <div className="my-4">
          <div className="text-[15px]">{item.name}</div>
          <div className="text-[11px]">
            {item.description || "Sans description"}
          </div>
        </div>
        <div className="flex justify-between items-center">
          {item.dueDate && (
            <p className="text-xs text-gray-500">
              Échéance: {new Date(item.dueDate).toLocaleDateString()}
            </p>
          )}
          <span>
            <img src={iconPerson} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};
