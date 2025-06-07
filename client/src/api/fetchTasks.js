export const fetchTasks = async (projets, setTasks, navigate) => {
  try {
    const res = await fetch(
      `http://localhost:4000/tasks/project/${projets._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!data.tasks) {
      localStorage.removeItem("tasks");
      setTasks([]);
    } else {
      setTasks(data.tasks);
      localStorage.setItem("tasks", JSON.stringify(data.tasks));
    }
  } catch (error) {
    navigate("/dashboard")
  }
};
