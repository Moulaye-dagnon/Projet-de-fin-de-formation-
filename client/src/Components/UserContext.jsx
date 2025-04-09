import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}){
    const [user, setUser] = useState(()=>{
        return JSON.parse(localStorage.getItem("user"))
    })

    const [token, setToken] = useState(()=>{
        return localStorage.getItem("token")
    })

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user") 
        const navigate = useNavigate()
        navigate("/login")
    }

    return (
        <UserContext.Provider value={{user,token,logout}}>
            {children}
        </UserContext.Provider>
    )
}