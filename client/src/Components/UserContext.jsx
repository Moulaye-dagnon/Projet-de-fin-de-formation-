import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  console.log(localStorage.getItem("token"))

  function login(user,token){
    setUser(user)
    setToken(token)
  }

  function logout() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{ user, token, logout, login}}>
      {children}
    </UserContext.Provider>
  );
}
