import { useDragLayer } from "react-dnd";
import iconMenuPoint from "../../assets/menu-point.svg";
import iconPerson from "../../assets/person.svg";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import {
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
} from "react-icons/md";
export const CustomDragLayer = () => {
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
        position: "fixed",
        pointerEvents: "none",
        left: 0,
        top: 0,
        zIndex: 40,
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        width: "282px",
      }}
    >
      <div
        className={`bg-white p-4 w-full rounded-2xl mx-auto relative overflow-hidden `}
      >
        <div className="relative ">
          <span className=" p-0.5   border-2 border-transparent hover:border-slate-100 hover:shadow-2xl rounded-xs text-xl font-extrabold cursor-pointer absolute top-0 left-0 ">
            {item.priority == "low" && <MdOutlineSignalCellularAlt1Bar />}
            {item.priority == "medium" && <MdOutlineSignalCellularAlt2Bar />}
            {item.priority == "hight" && <MdOutlineSignalCellularAlt />}
          </span>
          <span className="text-xs opacity-50 inline-block ml-8 font-bold">
            Project name
          </span>
          <span className=" p-0.5   border-2 border-transparent hover:border-slate-100 hover:shadow-2xl rounded-xs text-xl font-extrabold cursor-pointer absolute  right-0">
            {item.status == "todo" && <LuCircleDashed color="#F97316" />}
            {item.status == "doing" && <RiProgress1Line color="#FACC15" />}
            {item.status == "done" && (
              <IoMdCheckmarkCircleOutline color="#8B5CF6" />
            )}
          </span>
        </div>

        <div className="my-4">
          <div className="text-[15px] font-bold">{item.name}</div>
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
