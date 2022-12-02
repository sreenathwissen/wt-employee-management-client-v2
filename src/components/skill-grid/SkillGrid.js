import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SkillForm from "../skill-form/SkillForm";

const SkillGrid = () => {
  const initialValue = [];
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const onChange = (e) => {
    const val = e.target.value;
    setFormData(val.split(","));
  };

  const handleFormSubmit = () => {
    fetch("/api/skill", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      handleClose();
      getSkills();
      setFormData(initialValue);
    });
  };

  // const handleDelete = (id) => {
  //   fetch(url + `/${id}`, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then((res) => getSkills());
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = () => {
    fetch("/api/skill")
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const columns = useMemo(() => [
    {
      accessorKey: "skillId",
      header: "Skill Id",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "skillName", //access nested data with dot notation
      header: "Skill Name",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
  ]);

  return (
    <>
      <Grid sx={{ m: 0, p: 2 }} align="right">
        <Button
          // sx={{ m: 2 }}
          className="btn-add"
          variant="contained"
          color="success"
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon /> &nbsp; Add Skill
        </Button>
      </Grid>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        initialState={{ density: "compact" }}
        // enableFilters={false}
        enableColumnFilters={false}
        data={tableData}
        enableRowVirtualization
      />
      <SkillForm
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default SkillGrid;
