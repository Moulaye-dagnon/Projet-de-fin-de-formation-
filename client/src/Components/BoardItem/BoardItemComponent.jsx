import { TaskComponent } from "../Task/TaskComponent";
import iconPlus from "../../assets/plus.svg";
import { useContext, useRef } from "react";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbClockPause } from "react-icons/tb";

import { useDrop } from "react-dnd";
import { Patch_api } from "../../api/api";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../api/config";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import { LuCircleDashed } from "react-icons/lu";
import { ProjectContext } from "../../Context/ProjectContext";
import { SortByPriorityAndOrder } from "../../Utils/getTryByPriority";
import { motion, AnimatePresence } from "motion/react";
import { io } from "socket.io-client";
import { front_url } from "../../api/config";
import { useEffect } from "react";
const socket = io(`${front_url}`, { transports: ["websocket"] });
export function BoardItemComponent({
  title,
  tasks,
  columnid,
  handlerIconPlus,
  color,
  ColumPerso = false,
}) {
  const { user } = useContext(UserContext);
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { projectId } = useParams();
  const ref = useRef();

  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrap(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleDrap = async (item) => {
    const taskInColumn = alltasks.filter((t) => t.status == columnid);
    const newOrder = taskInColumn.length + 1;
    const updateTasks = alltasks.map((task) => {
      if (task._id === item._id) {
        return { ...task, status: columnid, order: newOrder };
      }
      return task;
    });
    const orderedTask = SortByPriorityAndOrder(updateTasks);
    console.log(user._id);
    try {
      await axios.patch(`${base_url}/task/reorder/${user._id}`, {
        tasks: orderedTask.map((task) => ({
          _id: task._id,
          status: task.status,
          priority: task.priority,
          order: task.order,
        })),
        projectId,
      });
      setAllTasks([...orderedTask]);
      socket.emit("task-change");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      ref={drop}
      className=" shrink flex flex-col overflow-hidden  rounded-md   w-[330px] bg-bg-todo h-full border-2 border-gray-300"
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
            {title == "En pause" && (
              <TbClockPause color="#0ea5e9" fontSize="30px" />
            )}
          </span>
          {title}
          <span className=" opacity-50 ml-1.5">{tasks.length}</span>
        </div>
        {!ColumPerso && (
          <span
            onClick={handlerIconPlus}
            className="absolute hover:bg-sky-50 p-1 cursor-pointer rounded-xs  top-4 right-2"
          >
            <img src={iconPlus} alt="" />
          </span>
        )}
      </div>

      <div
        ref={ref}
        className=" flex-1 p-2 space-y-2 overflow-y-auto pb-20 relative"
      >
        <AnimatePresence>
          {isOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className=" backdrop-blur-md fixed bg-white/50 flex-1 inset-0 flex justify-center items-center z-10  "
              style={{
                width: ref.current?.getBoundingClientRect().width || "100%",
                height: ref.current?.getBoundingClientRect().higth || "100%",
                transform: `translate(${
                  ref.current?.getBoundingClientRect().left || 0
                }px, ${ref.current?.getBoundingClientRect().top || 0}px)`,
              }}
            >
              <div className=" bg-white py-2 px-3 border font-bold border-white rounded-md shadow-md max-w-[90%]">
                <p className=" text-sm font-medium text-center">
                  Ordonner par priorité
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {tasks.map((task) => (
          <TaskComponent key={task._id} item={task} perso={ColumPerso} />
        ))}
      </div>
    </div>
  );
}
