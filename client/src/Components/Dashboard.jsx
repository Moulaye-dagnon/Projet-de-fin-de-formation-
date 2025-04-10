import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  const {user,token,logout} = useContext(UserContext)
  console.log(token)
  useEffect(()=>{
    fetch("http://localhost:4000/",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(req=>{
      if(req.status === 401){
        logout()
        navigate("/login")
      }else{
        return req.json()
      }
    }).then(res=> {
      console.log(res)
    })
  },[token])
  return (
    <div>
      {token && <p>token récupérer</p>}
    </div>
  )
}