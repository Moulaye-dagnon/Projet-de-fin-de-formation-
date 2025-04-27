import { Link } from "react-router-dom";
import App from "../App";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Logup from "./Forms/Logup";

export default function Home() {
   const {user,token,logout} = useContext(UserContext)
    console.log(user)
    console.log(token)
  return (
    <div className="text-center mt-10">
      <button className="p-2 rounded w-30 me-4"><Link to={"/loguptest"}>S'inscrire</Link></button>
      <button className="p-2 rounded w-30 me-4"><Link to={"/login"}>Se connecter</Link></button>
    </div>
  );
}
