import { TaskComponent } from "../Task/TaskComponent";
import iconPlus from "../../assets/plus.svg";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

export function BoardItemComponent({
  title,
  tasks,
  project_name,
  columnid,
  handlerIconPlus,
}) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: columnid });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-[32%]  pt-4.5 px-2 bg-bg-todo h-[calc(100svh-90px)] "
    >
      <div className="relative">
        <div className="ml-3">{title}</div>
        <span onClick={handlerIconPlus} className="absolute top-1 right-2">
          <img src={iconPlus} alt="" />
        </span>
      </div>
      <div className="mt-5 h-[calc(100svh-160px)] overflow-y-auto">
        {tasks.tasks.map((task) => (
          <TaskComponent key={task._id} item={task} />
        ))}
      </div>
    </div>
  );
}
