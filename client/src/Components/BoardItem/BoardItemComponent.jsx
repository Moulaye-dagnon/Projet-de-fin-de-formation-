import { TaskComponent } from "../Task/TaskComponent";
import iconPlus from "../../assets/plus.svg";
import { useContext, useEffect, useState } from "react";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDrop } from "react-dnd";
import { Patch_api } from "../../api/api";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../api/config";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import { LuCircleDashed } from "react-icons/lu";
import { OrderedFunction } from "../../../../server/Utils/orderdedFunction";

export function BoardItemComponent({
  title,
  status,
  tasks,
  project_name,
  columnid,
  handlerIconPlus,
  color,
}) {
  const { user } = useContext(UserContext);
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { projectId } = useParams();

  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrap(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleDrap = async (item) => {
    const updateTasks = alltasks.map((task) => {
      if (task._id === item._id) {
        return { ...task, status: columnid };
      }
      return task;
    });

    const orderedTask = OrderedFunction(updateTasks);
    try {
      await axios.patch(`${base_url}/task/reorder/${user._id}`, {
        tasks: orderedTask.map((task) => ({
          _id: task._id,
          status: task.status,
          priority: task.priority,
        })),
        projectId,
      });
      setAllTasks([...orderedTask]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      ref={drop}
      className=" flex flex-col overflow-hidden rounded-md shrink-0  w-[330px]   bg-bg-todo h-full "
    >
      <div style={{ backgroundColor: `${color}` }} className="relative py-4 ">
        <div className="flex items-center ml-3 font-bold">
          <span className=" inline-block mx-2">
            {title == "À faire" && (
              <LuCircleDashed color="#F97316" fontSize="30px" />
            )}
            {title == "En cours" && (
              <RiProgress1Line color="#FACC15" fontSize="30px" />
            )}
            {title == "Terminé" && (
              <IoMdCheckmarkCircleOutline color="#8B5CF6" fontSize="30px" />
            )}
          </span>
          {title}
          <span className=" opacity-50 ml-1.5">{tasks.length}</span>
        </div>
        <span
          onClick={handlerIconPlus}
          className="absolute hover:bg-sky-50 p-1 cursor-pointer rounded-xs  top-4 right-2"
        >
          <img src={iconPlus} alt="" />
        </span>
      </div>
      <div
        className={`flex-1 h-full p-2   space-y-2 overflow-y-auto ${
          isOver ? "bg-slate-200" : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskComponent key={task._id} item={task} />
        ))}
      </div>
    </div>
  );
}
