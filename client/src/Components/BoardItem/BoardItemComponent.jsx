import { TaskComponent } from "../Task/TaskComponent";
import iconPlus from "../../assets/plus.svg";
import { useEffect, useState } from "react";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDrop } from "react-dnd";
import { use_fetch_all_tasks } from "../../api/all_tasks_in_project";

export function BoardItemComponent({
  title,
  status,
  tasks,
  project_name,
  columnid,
  handlerIconPlus,
  color,
  setAllTasks,
  alltasks,
}) {
  const OrderedFunction = (Tasks, columnId) => {
    const priorityOrder = { hight: 1, medium: 2, low: 3 };

    return Tasks.filter((task) => task.status === columnId).sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrap(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const handleDrap = (item) => {
    const updateTasks = alltasks.map((task) => {
      if (task._id === item._id) {
        return { ...task, status: columnid };
      }
      return task;
    });
    setAllTasks([...updateTasks]);
  };

  return (
    <div ref={drop} className="w-[32%]   bg-bg-todo h-[calc(100svh-90px)] ">
      <div style={{ backgroundColor: `${color}` }} className="relative py-4 ">
        <div className="flex items-center ml-3 font-bold">
          <span className=" inline-block mx-2">
            {title == "À faire" && <RiProgress1Line />}
            {title == "En cours" && <RiProgress3Line />}
            {title == "Terminé" && <IoMdCheckmarkCircleOutline />}
          </span>
          {title}
        </div>
        <span
          onClick={handlerIconPlus}
          className="absolute hover:bg-sky-50 p-1 cursor-pointer rounded-xs  top-4 right-2"
        >
          <img src={iconPlus} alt="" />
        </span>
      </div>
      <div
        className={`mt-2 h-[calc(100svh-160px)] px-2 overflow-y-auto ${
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
