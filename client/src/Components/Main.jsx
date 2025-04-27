import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResetPassword from "./Forms/ResetPassword";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import { LayoutComponent } from "./layout";
import { ProjectDetail } from "../Page/ProjectDetail/ProjectDetail";
import LogupTest from "./Forms/LogupTest";
import Login from "./Forms/Login";
import Dashboard from "./Dashboard";
import { useState } from "react";
import ResetPasswordEmail from "./Forms/ResetPasswordEmail";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/" element={<LayoutComponent />}>
          <Route index element={<Dashboard />} />
          <Route path="project/:projectId" element={<ProjectDetail />} />
        </Route>
        <Route path="/" element={<Home />} />

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
