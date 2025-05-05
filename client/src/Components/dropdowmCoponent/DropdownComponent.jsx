import { RiProgress1Line } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Patch_api } from "../../api/api";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import { base_url } from "../../api/config";

export default function DropdownComponent({ task }) {
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { user } = useContext(UserContext);
  const { projectId } = useParams();
  const changeStatus = async (status) => {
    try {
      let updatedTaks = [...alltasks];
      updatedTaks = updatedTaks.map((item) => {
        if (item._id == task._id) {
          return { ...item, status: status };
        }
        return item;
      });
      try {
        await axios.patch(`${base_url}/task/reorder/${user._id}`, {
          tasks: updatedTaks.map((task) => ({
            _id: task._id,
            status: task.status,
          })),
          projectId,
        });
        setAllTasks([...updatedTaks]);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log("bon", error);
    }
  };

  return (
    <div className="bg-slate-50 p-2 shadow-2xl rounded-2xl w-60 absolute right-8 ">
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
