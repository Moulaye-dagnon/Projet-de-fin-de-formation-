import { RiProgress1Line } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useEffect, useRef } from "react";

import useUpdateTask from "../../api/UpdateTask";
import {
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
} from "react-icons/md";
export default function DropdownPriority({ task, setToggleMenu }) {
  const { updateTask } = useUpdateTask();
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleMenu({
          status: false,
          priority: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const changePriority = async (priority) => {
    const result = await updateTask(task._id, "priority", priority);
    if (!result.success) {
      console.log(result.error);
    }
  };
  return (
    <div
      ref={dropdownRef}
      className="bg-slate-50 p-2 shadow-2xl rounded-2xl w-60 absolute right-8 "
    >
      <li
        onClick={() => changePriority("low")}
        className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span>
            <MdOutlineSignalCellularAlt1Bar />
          </span>
          <span>Faible</span>
        </div>
        {task.priority == "low" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li
        onClick={() => changePriority("medium")}
        className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between "
      >
        <div className="flex items-center gap-3">
          <span>
            <MdOutlineSignalCellularAlt2Bar />
          </span>
          <span>Moyen</span>
        </div>
        {task.priority == "medium" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li
        onClick={() => changePriority("hight")}
        className=" list-none gap-3 py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span>
            <MdOutlineSignalCellularAlt />
          </span>
          <span> Elevé</span>
        </div>
        {task.priority == "hight" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
    </div>
  );
}
