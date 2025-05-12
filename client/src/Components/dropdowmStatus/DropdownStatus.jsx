import { RiProgress1Line } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useEffect, useRef } from "react";

import useUpdateTask from "../../api/UpdateTask";

export default function DropdownStatus({ task, setToggleMenu }) {
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
  const changeStatus = async (status) => {
    const result = await updateTask(task._id, "status", status);
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
        onClick={() => changeStatus("todo")}
        className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span>
            <LuCircleDashed color="#F97316" />
          </span>
          <span>A faire</span>
        </div>
        {task.status == "todo" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li
        onClick={() => changeStatus("doing")}
        className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between "
      >
        <div className="flex items-center gap-3">
          <span>
            <RiProgress1Line color="#FACC15" />
          </span>
          <span>En cour</span>
        </div>
        {task.status == "doing" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li
        onClick={() => changeStatus("done")}
        className=" list-none gap-3 py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span>
            <IoMdCheckmarkCircleOutline color="#8B5CF6" />
          </span>
          <span> termier</span>
        </div>
        {task.status == "done" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
    </div>
  );
}
