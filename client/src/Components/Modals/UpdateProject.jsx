import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";
import { deleteProjectApi } from "../../api/deleteProjectApi";
import { useNavigate } from "react-router-dom";
import { updateProjectApi } from "../../api/updateProjectApi";
import ErrorModal from "./ErrorModal";
export default function UpdateProject({
  openUpdateProject,
  setOpenUpdateProject,
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { projets } = useContext(ProjectContext);
  const currentProjectDate = new Date(projets.dueDate).toISOString().split('T')[0];
  const [data, setData] = useState({
    name: projets.name,
    description: projets.description,
    date: currentProjectDate,
  });
  const [loading, setLoading] = useState("");
  const userId = user.id;
  const projectID = projets._id;
  function handleSubmit(e) {
    e.preventDefault();
    updateProjectApi(
      userId,
      projectID,
      setOpenUpdateProject,
      navigate,
      data,
      setLoading
    );
  }
  function handleDelete() {
    if (
      window.confirm(
        "Ce projet sera totalement supprimer si vous décider de confirmer"
      )
    ) {
      deleteProjectApi(
        userId,
        projectID,
        setOpenUpdateProject,
        navigate,
        setLoading
      );
    }
  }
  return (
    <div
      className="inset-0 fixed bg-black/50 z-90"
      onClick={() => setOpenUpdateProject(!openUpdateProject)}
    >
      <div
        className="mx-4 bg-gray-200 rounded-lg m-auto mt-3 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="bg-red-600 px-1 py-1 block ml-auto w-6 rounded-sm text-white cursor-pointer text-center"
          onClick={() => setOpenUpdateProject(!openUpdateProject)}
        >
          x
        </span>
        <div className="text-center pt-5">
          <h1>Modification du projet</h1>
          <form className="flex flex-col gap-3 mt-10 " onSubmit={handleSubmit}>
            <label htmlFor="nom">Nom du projet</label>
            <input
              type="text"
              id="description"
              className="border-2 border-gray-300 rounded p-2.5"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Saisissez le nom"
              required
            />

            <label htmlFor="nom">Description du projet</label>
            <input
              type="text"
              id="description"
              className="border-2 border-gray-300 rounded p-2.5"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Une description"
              required
            />
            <label htmlFor="nom">Echéance du projet</label>
            <input
              type="date"
              id="echeance"
              className="border-2 border-gray-300 rounded p-2.5"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              placeholder="Date d'échéance du projet"
              required
            />
            <div className="flex gap-4">
              <button className="btn rounded p-2 cursor-pointer text-gray-50">
                Enregistrer les modifications
              </button>
              <a
                className="btn rounded p-2 cursor-pointer text-gray-50 bg-red-600"
                onClick={handleDelete}
              >
                Abandonner le projet
              </a>
            </div>
          </form>
          {loading && <ErrorModal />}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
