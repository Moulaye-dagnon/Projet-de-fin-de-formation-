import { useDrag } from "react-dnd";
import iconMenuPoint from "../../assets/menu-point.svg";
import iconPerson from "../../assets/person.svg";
import { useContext, useState } from "react";
import { RiProgress1Line, RiProgress3Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import {
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt1Bar,
} from "react-icons/md";
import DropdownStatus from "../dropdowmStatus/DropdownStatus";
import DropdownPriority from "../dropdowPriority/dropdownPriority";
import { motion } from "motion/react";
import { ProjectContext } from "../../Context/ProjectContext";
import { isCanChagetStatusOrPriority } from "../../Utils/isCanChagetStatusOrPriority";
import { UserContext } from "../../Context/UserContext";
export function TaskComponent({ item }) {
  const { projets } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [toggleMenu, setToggleMenu] = useState({
    status: false,
    priority: false,
  });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: item,
    canDrag: isCanChagetStatusOrPriority({
      isAssigneTo: { item },
      user,
      projets,
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleToggleStatus = () => {
    setToggleMenu({
      ...toggleMenu,
      status: !toggleMenu.status,
    });
  };
  const handleTogglePriority = () => {
    setToggleMenu({
      ...toggleMenu,
      priority: !toggleMenu.priority,
    });
  };
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    dragging: { scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      variants={cardVariants}
      initial="initial"
      transition={{ duration: 0.5, ease: "easeOut" }}
      animate={isDragging ? "dragging" : "animate"}
      exit="exit"
      layout
      ref={drag}
      className={`bg-white p-4 w-72 rounded-2xl mx-auto relative  ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="relative ">
        <span
          onClick={handleTogglePriority}
          className=" p-0.5   border-2 border-transparent hover:border-slate-100 hover:shadow-2xl rounded-xs text-xl font-extrabold cursor-pointer absolute top-0 left-0 "
        >
          {item.priority == "low" && <MdOutlineSignalCellularAlt1Bar />}
          {item.priority == "medium" && <MdOutlineSignalCellularAlt2Bar />}
          {item.priority == "hight" && <MdOutlineSignalCellularAlt />}
        </span>
        <span className="text-xs opacity-50 inline-block ml-8 font-bold">
          {projets.name}
        </span>
        <span
          onClick={handleToggleStatus}
          className=" p-0.5   border-2 border-transparent hover:border-slate-100 hover:shadow-2xl rounded-xs text-xl font-extrabold cursor-pointer absolute  right-0"
        >
          {item.status == "todo" && <LuCircleDashed color="#F97316" />}
          {item.status == "doing" && <RiProgress1Line color="#FACC15" />}
          {item.status == "done" && (
            <IoMdCheckmarkCircleOutline color="#8B5CF6" />
          )}
        </span>
      </div>
      {toggleMenu.status &&
        isCanChagetStatusOrPriority({
          isAssigneTo: { item },
          user,
          projets,
        }) && <DropdownStatus setToggleMenu={setToggleMenu} task={item} />}
      {toggleMenu.priority &&
        isCanChagetStatusOrPriority({
          isAssigneTo: { item },
          user,
          projets,
        }) && <DropdownPriority setToggleMenu={setToggleMenu} task={item} />}
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
    </motion.div>
  );
}
