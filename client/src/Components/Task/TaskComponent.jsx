import { useDrag } from "react-dnd";
import iconMenuPoint from "../../assets/menu-point.svg";
import iconPerson from "../../assets/person.svg";
import DropdownComponent from "../dropdowmCoponent/DropdownComponent";
import { useState } from "react";
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
      className={`bg-white p-5 rounded-2xl m-3 relative cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="relative ">
        <span className="text-[8px]">Project name</span>
        <span onClick={handleToggle} className=" cursor-pointer">
          <img className=" absolute top-2 right-0" src={iconMenuPoint} alt="" />
        </span>
      </div>
      {toggleMenu ? <DropdownComponent task={item} /> : <></>}
      <div className="my-4">
        <div className="text-[15px]">{item.name}</div>
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
