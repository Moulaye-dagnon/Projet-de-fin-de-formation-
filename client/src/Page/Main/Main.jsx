import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LayoutComponent } from "../../Components/layout/layout";
import { ProjectDetail } from "../ProjectDetail/ProjectDetail";
import ResetPassword from "../resetPassword/ResetPassword";
import Home from "../home/Home";
import PageNotFound from "../pagenotFound/PageNotFound";
import Logup from "../../Components/Forms/Logup";
import LogupTest from "../logupTest/LogupTest";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import { useState, useContext } from "react";
import ResetPasswordEmail from "../resetPasswordEmail/ResetPasswordEmail";
import Users from "../user/Users";
import { UserContext } from "../../Context/UserContext";
import UserProfil from "../userProfil/UserProfil";
import UpdateUser from "../updateUser/UpdateUser";
import AddUser from "../AddUser/AddUser";
import AcceptInvitation from "../acceptInvitation/AcceptInvitation";

export default function Main() {
  const { user, token, logout } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard/" element={<LayoutComponent />}>
          {/*<Route index element={<Dashboard />} />*/}
          <Route path="project/:projectId" index element={<ProjectDetail />} />
          <Route path="users" element={<Users />} />
          <Route path="users/adduser" element={<AddUser />} />
          <Route path="users/user/:id" element={<UserProfil />} />
          <Route path="users/user/update-user/:id" element={<UpdateUser />} />
        </Route>

        {/* <Route path="/logup" element={<Logup />} /> */}
        <Route path="/loguptest" element={<LogupTest />} />
        <Route path="/logup/:token" element={<AcceptInvitation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
