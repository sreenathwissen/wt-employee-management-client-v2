import React from "react";
import "./App.css";
import Header from "./components/header";
import DataGrid from "./components/data-grid";
import ClientGrid from "./components/client-grid";
import ProjectGrid from "./components/project-grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<DataGrid />} />
          <Route path="/client" element={<ClientGrid />} />
          <Route path="/project" element={<ProjectGrid />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
