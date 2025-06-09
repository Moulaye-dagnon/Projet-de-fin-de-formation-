import { base_url } from "./config"

export const fetchAuth = (logout, navigate, projectID) => {
  try {
    fetch(`${base_url}/${projectID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((req) => {
      if (req.status === 401) {
        logout();
        navigate("/login");
        return;
      } else {
        return req.json();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
