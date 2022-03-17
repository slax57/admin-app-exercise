import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./users/Users";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
