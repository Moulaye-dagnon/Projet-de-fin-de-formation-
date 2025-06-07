import { toast } from "react-toastify";

export const fetchLogin = (data, login, navigate) => {
  fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data),
  })
    .then((req) => {
      if(req.status === 409){
        toast.error("E-mail incorrect!!")
      }else if(req.status === 500){
        toast.error("mot de passe incorrect!")
      }
      return req.json();
    })
    .then((res) => {
      if (res.token) {
        login(res.data);
        navigate("/dashboard");
      } else {
        setError(true);
      }
    });
};
