import { base_url } from "./config"

export const fetchProjectUsers = async (projets, setProjectUsers, navigate,setLoading) => {
  try {
    setLoading(true)
    const res = await fetch(
      `${base_url}/projet/${projets._id}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projets.menbres),
      }
    );

    const data = await res.json();
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
    if (!data.error) {
      setProjectUsers(data);
      localStorage.setItem("projectUsers", JSON.stringify(data));
    } else {
      localStorage.removeItem("projectUsers");
      setProjectUsers([]);
    }
  } catch (error) {
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
    navigate("/dashboard");
  }
};
