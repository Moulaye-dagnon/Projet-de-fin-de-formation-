import { useSortable } from "@dnd-kit/sortable";
import iconMenuPoint from "../../assets/menu-point.svg";
import iconPerson from "../../assets/person.svg";
import { CSS } from "@dnd-kit/utilities";
export function TaskComponent({ item }) {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id: item._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className=" bg-white p-5 rounded-2xl m-3"
    >
      <div className="relative">
        <span className="text-[8px]">Project name</span>
        <span>
          <img className=" absolute top-2 right-2" src={iconMenuPoint} alt="" />
        </span>
      </div>
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
