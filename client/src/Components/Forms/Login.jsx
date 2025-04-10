import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Email from "./logupInputs/Email";
import Password from "./logupInputs/Password";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const { user, token, logout, login} = useContext(UserContext)
    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(req=> req.json()).then(res=>{
            localStorage.setItem("token",res.token)
            localStorage.setItem("user",JSON.stringify(res.data))
            login(res.data,res.token)
            navigate("/dashboard")
        })
    }
  return (
    <div className="box lg:flex">
          <div className="left-box flex-grow-1 p-20 bg-gray-100 h-screen">
            <p className="text-start mb-30 text-xl"><strong className="font-bold">GPC</strong> Gestion de Projet Collaboratif</p>
            <h1 className="text-start text-black text-3xl font-bold">Connectez vous à votre compte GPC</h1>
            <form
              onSubmit={handleSubmit}
              method="post"
              className="flex flex-col gap-3"
            >
              <Email data={data} setData={setData}/>
              <Password data={data} setData={setData}/>
    
              <p>Vous n'avez pas de compte? <a className="text-blue-600"><Link to="/loguptest">S'inscrire'</Link></a></p>
              <button className="btn rounded w-30 p-2 ms-auto cursor-pointer text-gray-50" type="submit">Se connecter</button>
            </form>
          </div>
    
          <div className="right-box w-52 flex-grow-1 hidden lg:block h-screen">
            <img className="h-screen w-screen" src="/img1.avif" alt="image" />
          </div>
        </div>
  )
}