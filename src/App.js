import React from "react";
import "./App.css";
import Header from "./components/header";
import DataGrid from "./components/data-grid";
import ClientGrid from "./components/client-grid";
import ProjectGrid from "./components/project-grid";
const App = () => {
  return (
    <div className="App">
      <Header />
      <DataGrid />
      <ClientGrid/>
      <ProjectGrid/>
    </div>
  );
};

export default App;
