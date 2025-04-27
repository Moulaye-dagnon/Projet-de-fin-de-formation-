import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Logup from "./Forms/Logup";
import LogupTest from "./Pages/LogupTest";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useState, useContext } from "react";
import ResetPasswordEmail from "./Pages/ResetPasswordEmail";
import Users from "./Pages/Users";
import { UserContext } from "../Context/UserContext";
import UserProfil from "./Pages/UserProfil";
import UpdateUser from "./Pages/UpdateUser";

export default function Main() {
  const { user, token, logout } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/logup" element={<Logup />} />
        <Route path="/loguptest" element={<LogupTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/user/:id" element={<UserProfil />} />
        <Route path="/dashboard/users/user/update-user/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}
