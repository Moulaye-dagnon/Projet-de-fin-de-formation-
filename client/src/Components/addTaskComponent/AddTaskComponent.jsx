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
  console.log(projectUsers);
  // Définir les options pour chaque dropdown
  const statusOptions = [
    { value: "todo", label: "À faire" },
    { value: "doing", label: "En cours" },
    { value: "done", label: "Terminée" },
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
  const [AddTask, setAddTask] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    assignTo: "",
  });
  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddTask({ ...AddTask, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    AddTaskApi({
      data: AddTask,
      alltasks: alltasks,
      setAllTasks: setAllTasks,
      userId: user.id,
      projectId: projectId,
    });
    setToggle(false);
  };

  return (
    <div className=" absolute p-5 top-0 right-0 left-0 bottom-0 bg-black/50 backdrop-blur-xs">
      <div className=" w-full py-3 lg:w-3xl rounded-2xl mx-auto bg-slate-50">
        <div className="flex items-center justify-between">
          <span className="  ml-3  w-20 flex items-center border rounded-2xl  ">
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
            <div className="flex justify-between items-center w-[95%] space-x-4">
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
            </div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-3 py-2 border border-slate-500 bg-slate-500 text-slate-50 hover:text-slate-500 hover:bg-slate-50 rounded-2xl"
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
