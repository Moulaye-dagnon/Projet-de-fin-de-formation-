import { BoardItemComponent } from "../../Components/BoardItem/BoardItemComponent";
import iconMenuPoint from "../../assets/menu-point.svg";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { base_url } from "../../api/config";
import { UserContext } from "../../Context/UserContext";
import iconPerson from "../../assets/person.svg";
import { useParams } from "react-router-dom";
import { AddTaskComponent } from "../../Components/addTaskComponent/AddTaskComponent";
import { useDragLayer } from "react-dnd";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";
import { SortByPriorityAndOrder } from "../../Utils/getTryByPriority";

export default function UserTasks() {
  const [activeTask, setActiveTask] = useState(null);
  const { projectId, userId } = useParams();

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
        const userTasks = allTasks.filter((t) => t.assignTo === userId);
        setAllTasks(userTasks);
      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchProject();
  }, [projectId, token]);
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
          <div className="overflow-x-auto  flex-1 flex items-center flex-col h-[calc(100%-104px)] w-full ">
            <div className="h-full w-full">
              <div className="flex h-full overflow-x-auto gap-3 px-2 min-w-max">
                <BoardItemComponent
                  title={"À faire"}
                  tasks={todo}
                  columnid="todo"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(249, 115, 22, 0.063)"}
                  ColumPerso={true}
                />

                <BoardItemComponent
                  title={"En cours"}
                  tasks={doing}
                  columnid="doing"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(250, 204, 21, 0.063)"}
                  ColumPerso={true}
                />

                <BoardItemComponent
                  title={"Terminé"}
                  tasks={done}
                  columnid="done"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(139, 92, 246, 0.063)"}
                  ColumPerso={true}
                />
                <BoardItemComponent
                  title={"En pause"}
                  tasks={paused}
                  columnid="paused"
                  handlerIconPlus={handlerIconPlus}
                  color={"rgba(14, 165, 233, 0.063)"}
                  ColumPerso={true}
                />
              </div>
            </div>
          </div>
          <CustomDragLayer />
          {activeTask && <AddTaskComponent setToggle={setActiveTask} />}
        </>
      ) : (
        <SpinnerComponent />
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
