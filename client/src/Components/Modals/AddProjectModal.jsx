import { useContext, useState } from "react";
import Nom from "../Forms/logupInputs/Nom";
import { ToastContainer } from "react-toastify";
import { fetchNewProject } from "../../api/fetchNewProject";
import { UserContext } from "../../Context/UserContext";
export default function AddProjectModal({ openAddProject, setOpenAddProject }) {
  const { user, token } = useContext(UserContext);
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const userId = user.id;
  function handleSubmit(e) {
    e.preventDefault();
    fetchNewProject(userId, token, data, setOpenAddProject);
  }
  return (
    <div
      className="inset-0 fixed bg-black/50 z-90"
      onClick={() => setOpenAddProject(!openAddProject)}
    >
      <div
        className="mx-4 h-96 bg-gray-200 rounded-lg m-auto mt-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="bg-red-600 px-1 py-1 block ml-auto w-6 rounded-sm text-white cursor-pointer text-center"
          onClick={() => setOpenAddProject(!openAddProject)}
        >
          x
        </span>
        <div className="text-center pt-5">
          <h1>Créez un nouveau projet</h1>
          <form className="flex flex-col gap-3 mt-10 " onSubmit={handleSubmit}>
            <label htmlFor="nom">Nom du projet</label>
            <input
              type="text"
              id="description"
              className="border-2 border-gray-300 rounded p-2.5"
              value={data.nom}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Saisissez le nom"
              required
            />

            <label htmlFor="nom">Description du projet</label>
            <input
              type="text"
              id="description"
              className="border-2 border-gray-300 rounded p-2.5"
              value={data.nom}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Une description"
              required
            />
            <button className="btn rounded w-30 p-2 cursor-pointer text-gray-50">
              Ajouter
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
