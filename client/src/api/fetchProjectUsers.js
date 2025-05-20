export const fetchProjectUsers = async (
  projets,
  setProjectUsers,
  removeData) => {
  try {
    const res = await fetch(`http://localhost:4000/projet/${projets._id}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projets.menbres),
    });

    const data = await res.json();
    if (!data.error) {
      setProjectUsers(data);
      localStorage.setItem("projectUsers", JSON.stringify(data));
    } else {
      localStorage.removeItem("projectUsers");
      setProjectUsers([]);
    }
  } catch (error) {
    console.log(error);
  }
};
