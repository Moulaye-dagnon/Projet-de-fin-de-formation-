import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResetPassword from "./Forms/ResetPassword";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Logup from "./Forms/Logup";
import Cover from "./Forms/Cover";
import 'bootstrap/dist/js/bootstrap.bundle.min';



export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/logup" element={<Logup />} />
        <Route path="/cover" element={<Cover/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
