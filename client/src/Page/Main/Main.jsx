import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LayoutComponent } from "../../Components/layout/layout";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";
import ResetPassword from "../resetPassword/ResetPassword";
import Home from "../home/Home";
import PageNotFound from "../pagenotFound/PageNotFound";
import LogupTest from "../logupTest/LogupTest";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import { useState, useContext } from "react";
import ResetPasswordEmail from "../resetPasswordEmail/ResetPasswordEmail";
import Users from "../user/Users";
import { UserContext } from "../../Context/UserContext";
import UserProfil from "../userProfil/UserProfil";
import UpdateUser from "../updateUser/UpdateUser";
import Cover from "../../Components/Cover/Cover";

export default function Main() {
  const { user, token, logout } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Cover />} />

        <Route path="/dashboard/" element={<LayoutComponent />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/user/:id" element={<UserProfil />} />
          <Route path="users/user/update-user/:id" element={<UpdateUser />} />
          <Route path="project/:projectId" element={<ProjectDetail />} />
        </Route>

        {/* <Route path="/logup" element={<Logup />} /> */}
        <Route path="/loguptest" element={<LogupTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
