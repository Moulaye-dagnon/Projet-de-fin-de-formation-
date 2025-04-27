import { useState } from "react";
import { MdAddTask } from "react-icons/md";
import { DropdownComponent } from "../dropdowmCoponent/DropdownComponent";

export function AddTaskComponent() {
  const [AddTask, setAddTask] = useState({
    title: "",
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
    console.log(AddTask);
  };

  return (
    <div className=" absolute p-5 top-0 right-0 left-0 bottom-0 bg-amber-950">
      <div className=" w-full py-3 lg:w-3xl rounded-2xl mx-auto bg-slate-50">
        <div className="  ml-3  w-20 flex items-center border rounded-2xl  ">
          <MdAddTask size={"2rem"} /> <span className=" font-bold">Task</span>
        </div>
        <div className=" w-full p-5 w-md-3/4">
          <form onSubmit={handlesubmit} action="">
            <div className="w-full ">
              <input
                type="text"
                name="title"
                placeholder="Titre de la tache"
                className=" w-full text-sm"
                value={AddTask.title}
                onChange={handleOnchange}
              />
            </div>
            <div className="w-full my-5">
              <input
                type="text"
                name="description"
                placeholder="Ajouter une description"
                className="w-full text-sm"
                value={AddTask.description}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex justify-between items-center w-[45%]">
              <DropdownComponent
                title={"todo"}
                name={"status"}
                handleChange={handleOnchange}
                value={AddTask.status}
              />
              <DropdownComponent
                title={"medium"}
                name={"priority"}
                handleChange={handleOnchange}
                value={AddTask.priority}
              />
              <DropdownComponent
                title={"assigner"}
                name={"assignTo"}
                handleChange={handleOnchange}
                value={AddTask.assignTo}
              />
            </div>
            <hr className="my-4" />
            <div>
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
