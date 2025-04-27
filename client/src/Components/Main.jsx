import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResetPassword from "./Forms/ResetPassword";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Logup from "./Forms/Logup";
<<<<<<< HEAD
import { LayoutComponent } from "./layout";
import { ProjectDetail } from "../Page/ProjectDetail/ProjectDetail";
=======
import LogupTest from "./Forms/LogupTest";
import Login from "./Forms/Login";
import Dashboard from "./Dashboard";
import { useState } from "react";
import ResetPasswordEmail from "./Forms/ResetPasswordEmail";
>>>>>>> dd0b5d0ff62a2c65340cce570967f54103e31543

export default function Main() {
  return (
    <>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Route>
        {/* <Route path="/" element={<Home />} /> */}
=======
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> dd0b5d0ff62a2c65340cce570967f54103e31543
        <Route path="*" element={<PageNotFound />} />
        <Route path="/logup" element={<Logup />} />
        <Route path="/loguptest" element={<LogupTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
      </Routes>
    </>
  );
}
