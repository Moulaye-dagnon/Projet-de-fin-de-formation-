import { toast } from "react-toastify";
import { base_url } from "./config";

export const fetchLogin = (data, login, navigate, setLoading) => {
  setLoading(true);
  fetch(`${base_url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then((req) => {
      if (req.status === 409) {
        toast.error("E-mail incorrect!!");
        setLoading(false);
      } else if (req.status === 500) {
        setLoading(false);
        toast.error("mot de passe incorrect!");
      } else if (req.status === 200) {
        setLoading(false);
        toast.success("Bienvenue");
      }
      return req.json();
    })
    .then((res) => {
      setTimeout(() => {
        if (res.token) {
          login(res.data);
          navigate("/dashboard");
        } else {
          console.log("erreur");
        }
      }, 1500);
    })
    .catch((err) => {
      console.error("Erreur de connexion :", err);
      toast.error("Une erreur s'est produite.");
      setLoading(false);
    });
};
