import { useContext, useState } from "react";
import { MdAddTask } from "react-icons/md";
import { AddTaskApi } from "../../api/AddTask";
import { UseAllTasksContext } from "../../Context/AllTaskContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { MdCancel } from "react-icons/md";
import CustomDropdown from "../customDropdow/CustomDropDown";
import { ProjectContext } from "../../Context/ProjectContext";

export function AddTaskComponent({ setToggle }) {
  const { projectUsers } = useContext(ProjectContext);

  // Définir les options pour chaque dropdown
  const statusOptions = [
    { value: "todo", label: "À faire" },
    { value: "doing", label: "En cours" },
    { value: "done", label: "Terminée" },
    { value: "paused", label: "Paused" },
  ];

  const priorityOptions = [
    { value: "low", label: "Faible" },
    { value: "medium", label: "Moyen" },
    { value: "high", label: "Élevé" },
  ];

  const assignToOptions = projectUsers.map((item) => {
    return { value: item._id, label: item.nom };
  });
  const { projectId } = useParams();
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { user } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  const [AddTask, setAddTask] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    assignTo: "",
    dueDate: "",
  });

  const isFormValid =
    AddTask.name &&
    AddTask.description &&
    AddTask.status &&
    AddTask.priority &&
    AddTask.assignTo &&
    AddTask.dueDate;
  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddTask({ ...AddTask, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    } else {
      AddTaskApi({
        data: AddTask,
        alltasks: alltasks,
        setAllTasks: setAllTasks,
        userId: user.id,
        projectId: projectId,
      });
      setToggle(false);
    }
  };

  const createdAt = new Date(projets.createdAt);
  const dueDate = new Date(projets.dueDate);
  const minDate = createdAt.toISOString().split("T")[0];
  const maxDate = dueDate.toISOString().split("T")[0];
  return (
    <div className=" absolute z-30 p-5 inset-0 bg-black/50 backdrop-blur-xs">
      <div className="w-full py-3 lg:w-3xl rounded-2xl mx-auto bg-slate-50">
        <div className="flex items-center justify-between">
          <span className="ml-3  w-20 flex items-center border rounded-2xl  ">
            <MdAddTask size={"2rem"} /> <span className=" font-bold">Task</span>
          </span>
          <span
            onClick={() => setToggle(false)}
            className=" mr-3  cursor-pointer hover:opacity-50   "
          >
            <MdCancel fontSize={"2rem"} color="" />
          </span>
        </div>
        <div className=" w-full px-5 py-2 w-md-3/4">
          <form onSubmit={handlesubmit} action="">
            <div className="w-full ">
              <input
                type="text"
                name="name"
                placeholder="Titre de la tache"
                className=" w-full text-sm outline-0"
                value={AddTask.name}
                onChange={handleOnchange}
              />
            </div>
            <div className="w-full my-5">
              <input
                type="text"
                name="description"
                placeholder="Ajouter une description"
                className="w-full text-sm outline-0 "
                value={AddTask.description}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex justify-between flex-wrap sm:flex-nowrap items-center w-[95%] space-x-0 sm:space-x-4 gap-y-2 sm:gap-y-0">
              <CustomDropdown
                name="status"
                value={AddTask.status}
                onChange={handleOnchange}
                options={statusOptions}
                placeholder="statut"
              />

              <CustomDropdown
                name="priority"
                value={AddTask.priority}
                onChange={handleOnchange}
                options={priorityOptions}
                placeholder=" priorité"
              />

              <CustomDropdown
                name="assignTo"
                value={AddTask.assignTo}
                onChange={handleOnchange}
                options={assignToOptions}
                placeholder="Assigner à"
              />
              <input
                className="flex items-center justify-center w-[45%] sm:w-full p-2 border border-[#76b1a6] rounded-md bg-[#76b1a6] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 hover:bg-[#50b1a1] hover:rotate-x-30 transition-all duration-500"
                name="dueDate"
                onChange={handleOnchange}
                value={AddTask.dueDate}
                type="date"
                min={minDate}
                max={maxDate}
              />
            </div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button
                id="CreateTask"
                type="submit"
                disabled={!isFormValid}
                className={`px-3 py-2  text-slate-50 hover:text-slate-500 rounded-2xl  transition-colors
                ${isFormValid ? "" : "bg-red-300 cursor-not-allowed"}`}
              >
                Cree la tache
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
