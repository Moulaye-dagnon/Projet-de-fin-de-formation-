import { createContext, useEffect, useState } from "react";
import { fetchAuth } from "../api/fetchAuth";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  function login(user, token) {
    setUser(user);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser("");
    setToken("");
  }

  useEffect(()=>{
    
  },[])

  return (
    <UserContext.Provider value={{ user, token, logout, login,setToken }}>
      {children}
    </UserContext.Provider>
  );
}
