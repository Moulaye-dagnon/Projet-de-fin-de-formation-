export const fetchProjectUsers = async (projets, setProjectUsers, navigate) => {
  try {
    const res = await fetch(
      `http://localhost:4000/projet/${projets._id}/users`,
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
    if (!data.error) {
      setProjectUsers(data);
      localStorage.setItem("projectUsers", JSON.stringify(data));
    } else {
      localStorage.removeItem("projectUsers");
      setProjectUsers([]);
    }
  } catch (error) {
    navigate("/dashboard");
  }
};
