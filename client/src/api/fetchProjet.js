import { base_url } from "./config"

export const fetchProjet = async (user, setProjets,projectId,navigate,setLoading) => {

  try {
    setLoading(true)
    const res = await fetch(`${base_url}/project/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    const data = await res.json();
    setTimeout(() => {
      setLoading(false)
    }, 300);
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
    setTimeout(() => {
      setLoading(false)
    }, 300);
    navigate("/dashboard")
  }
};
