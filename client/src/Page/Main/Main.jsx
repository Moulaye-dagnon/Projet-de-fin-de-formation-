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
import AddUser from "../AddUser/AddUser";
import AcceptInvitation from "../acceptInvitation/AcceptInvitation";
import ViewUsersComponent from "../../Components/viewUsersComponent/ViewUsersComponent";
import Help from "../help/Help";
import UserTasks from "../userTasks/UserTasks";
import ContactUs from "../contactUs/ContactUs";

export default function Main() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Cover />} />

        <Route
          path="/dashboard/"
          element={user ? <LayoutComponent /> : <Login />}
        >
          <Route path="project/:projectId" index element={<ProjectDetail />} />
          <Route path="users/:projectId" element={<Users />} />
          <Route path=":projectId/userTasks/:userId" element={<UserTasks />} />
          <Route path="users/adduser" element={<AddUser />} />
          <Route path="users/user/:id" element={<UserProfil />} />
          <Route path="users/user/update-user/:id" element={<UpdateUser />} />
          <Route path="/dashboard/stats/:projectId" element={<Dashboard />} />
          <Route
            path="/dashboard/team/:projectId"
            element={<ViewUsersComponent />}
          />
          <Route path="help" element={<Help />} />
          <Route path="contactus" element={<ContactUs />} />
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
