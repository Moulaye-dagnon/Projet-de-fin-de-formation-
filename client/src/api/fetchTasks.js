import { base_url } from "./config"

export const fetchTasks = async (projets, setTasks, navigate,setLoading) => {
  try {
    setLoading(true)
    const res = await fetch(
      `${base_url}/tasks/project/${projets._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )

    const data = await res.json();
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
    if (!data.tasks) {
      localStorage.removeItem("tasks");
      setTasks([]);
    } else {
      setTasks(data.tasks);
      localStorage.setItem("tasks", JSON.stringify(data.tasks));
    }
  } catch (error) {
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
    navigate("/dashboard")
  }
};
