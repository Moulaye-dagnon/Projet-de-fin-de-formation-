export const fetchProjet = async (user, setProjets, removeTwo, removeData,projectId) => {

  try {
    const res = await fetch(`http://localhost:4000/project/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const data = await res.json();

    function getLastProject(data, projectId) {
      return Array.isArray(data) ? data.find(p => p._id === projectId) : null;
    }
    const lastProject = getLastProject(data, projectId);
    if (lastProject) {
      setProjets(lastProject);
      localStorage.setItem("project", JSON.stringify(lastProject));
    } else {
      removeData()
    }
  } catch (error) {
    console.log("op");
  }
};
