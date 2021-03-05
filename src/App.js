import React from "react";
import Currencies from "./components/Currencies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Bitcoin Converter</h1>
      <div className="Form">
        <Currencies />
      </div>
    </div>
  );
}

export default App;
