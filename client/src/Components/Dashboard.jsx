import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function Dashboard() {
  const {user,token,logout} = useContext(UserContext)
  console.log(user)
  console.log(token)
  return (
    <div>Dashboard</div>
  )
}