import { createContext, useEffect, useState } from "react";
import { fetchAuth } from "../api/fetchAuth";
import { base_url } from "../api/config";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");

  const [token, setToken] = useState("");

  function login(user) {
    setUser(user);
  }

  function logout(navigate) {
    setUser("");
    setToken("");
      fetch(`${base_url}/logout`, {
        method: "GET",
        credentials: "include",
      });
  }

  useEffect(() => {
    fetch(`${base_url}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((req) => {
        if (req.status === 401) {
          logout();
        } else {
          return req.json();
        }
      })
      .then((res) => {
        login(res);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, token, logout, login, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
