import React from "react";
import "./App.css";
import CreateOrder from "./pages/CreateOrder";

function App() {
  console.log("rerender");
  return (
    <div className="app">
      <CreateOrder />
    </div>
  );
}

export default App;
