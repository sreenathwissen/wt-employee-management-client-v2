import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProjectForm from "../project-form/ProjectForm";
import ProjectLinkageForm from "../employee-project-linkage-form";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
const ProjectGrid = () => {
  const [tableData, setTableData] = useState([]);
  const url = "http://localhost:4000/projects";
  const [projectForm, setProjectForm] = useState(false);
  const [projectLinkajeForm, setProjectLinkajeForm] = useState(false);

  const handleClickOpen = (type) => {
    if (type === "project") {
      setProjectForm(true);
    } else if (type === "projectlinkage") {
      setProjectLinkajeForm(true);
    }
  };

  const handleClose = (type) => {
    if (type === "project") {
      setProjectForm(false);
    } else if (type === "projectlinkage") {
      setProjectLinkajeForm(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "pid",
        header: "Project ID",
      },
      {
        accessorKey: "pname",
        header: "Project Name",
      },
      {
        accessorKey: "plocation",
        header: "Project Location",
      },
      {
        accessorKey: "plead",
        header: "Project Lead",
      },
      {
        accessorKey: "ptype",
        header: "Project Type",
      },
      {
        accessorKey: "cid",
        header: "Client ID",
      },
    ],
    []
  );

  return (
    <>
      <Grid sx={{ m: 0, p: 2 }} align="right">
        <Button
          className="btn-add"
          variant="contained"
          color="success"
          onClick={() => handleClickOpen("project")}
        >
          <AddCircleOutlineIcon /> &nbsp; create new project
        </Button>
        <Button
          sx={{ m: 2 }}
          className="btn-add"
          variant="contained"
          color="success"
          onClick={() => handleClickOpen("projectlinkage")}
        >
          <AssignmentOutlinedIcon />
          &nbsp; Asign Project
        </Button>
      </Grid>
      <MaterialReactTable columns={columns} data={tableData} />
      <ProjectForm
        open={projectForm}
        handleClose={() => handleClose("project")}
      />
      <ProjectLinkageForm
        open={projectLinkajeForm}
        handleClose={() => handleClose("projectlinkage")}
      />
    </>
  );
};

export default ProjectGrid;
