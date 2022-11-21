import React from "react";
import "./App.css";
import Header from "./components/header";
import DataGrid from "./components/data-grid";
import ClientGrid from "./components/client-grid";
import ProjectGrid from "./components/project-grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
      </div>
    </Router>
  );
};

export default App;
