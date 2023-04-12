import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CoughWidget from "./components/cough-widget";

function App() {
  const handleClose = () => {};
  return (
    <div className="App">
      <CoughWidget onClose={handleClose} />
    </div>
  );
}

export default App;
