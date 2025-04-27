export const fetchProjet = async (user, token, setProjets, removeTwo, removeData) => {

  try {
    const res = await fetch(`http://localhost:4000/project/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    const lastProject = Array.isArray(data) ? data[data.length - 1] : null;
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
