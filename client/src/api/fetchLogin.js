import { toast } from "react-toastify";

export const fetchLogin = (data, setError, login, navigate) => {
	
  fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((req) => {
      console.log(req);
      return req.json();
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        login(res.data, res.token);
        navigate("/dashboard");
      } else {
        setError(true);
      }
    });
};
