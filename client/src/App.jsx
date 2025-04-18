import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import "./Components/Forms/logup.css"
import "./Components/Forms/cover.css"

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
