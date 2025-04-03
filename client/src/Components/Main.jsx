import { Route,Routes,BrowserRouter } from "react-router-dom"
import App from "../App"
import ResetPassword from "./Forms/ResetPassword"

export default function Main() {
  return (
    <>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
        </Routes>
    </>
  )
}