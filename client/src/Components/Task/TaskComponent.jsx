import { useDrag } from "react-dnd";
import iconMenuPoint from "../../assets/menu-point.svg";
import iconPerson from "../../assets/person.svg";
import DropdownComponent from "../dropdowmCoponent/DropdownComponent";
import { useState } from "react";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";

export function TaskComponent({ item }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleToggle = () => {
    console.log("aa");
    setToggleMenu((c) => !c);
  };
  return (
    <div
      ref={drag}
      className={`bg-white p-5 w-72 rounded-2xl m-3 relative cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="relative ">
        <span className="text-[8px] font-bold">Project name</span>
        <span
          onClick={handleToggle}
          className=" p-0.5 bo  border-2 border-transparent hover:border-slate-100 hover:shadow-2xl rounded-xs text-2xl font-extrabold cursor-pointer absolute top-2 right-0"
        >
          {item.status == "todo" && <LuCircleDashed color="#F97316" />}
          {item.status == "doing" && <RiProgress1Line color="#FACC15" />}
          {item.status == "done" && (
            <IoMdCheckmarkCircleOutline color="#8B5CF6" />
          )}
        </span>
      </div>
      {toggleMenu ? <DropdownComponent task={item} /> : <></>}
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
  );
}
