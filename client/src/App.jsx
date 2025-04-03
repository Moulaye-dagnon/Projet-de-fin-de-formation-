import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
