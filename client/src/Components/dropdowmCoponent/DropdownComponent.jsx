import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Patch_api } from "../../api/api";

export default function DropdownComponent({ task }) {

	const changeStatus= ({id, status})=>{
		try {
			Patch_api({})
		} catch (error) {
			
		}
	}

  return (
    <div className="bg-slate-50 p-2 shadow-2xl rounded-2xl w-60 absolute right-8 ">
      <li className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ color: "rgba(34, 197, 94)" }}>
            <RiProgress1Line />
          </span>
          <span>A faire</span>
        </div>
        {task.status == "todo" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li className=" list-none  py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <span style={{ color: "rgba(34, 197, 94)" }}>
            <RiProgress3Line />
          </span>
          <span>En cour</span>
        </div>
        {task.status == "doing" && (
          <span>
            <MdDone />
          </span>
        )}
      </li>
      <li className=" list-none gap-3 py-1 hover:bg-gray-100 hover:shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ color: "rgba(139, 92, 246)" }}>
            <IoMdCheckmarkCircleOutline />
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
