import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./Page/Main/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
