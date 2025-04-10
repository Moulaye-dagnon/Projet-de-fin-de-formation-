import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResetPassword from "./Forms/ResetPassword";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Logup from "./Forms/Logup";
import LogupTest from "./Forms/LogupTest";
import Login from "./Forms/Login";
import Dashboard from "./Dashboard";
import { useState } from "react";

export default function Main() {
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
      </Routes>
    </>
  );
}
