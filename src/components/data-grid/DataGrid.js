import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DataForm from "../data-form";

const DataGrid = () => {
  const [tableData, setTableData] = useState([]);
  const url = "http://localhost:4000/employees";
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
      },
      {
        accessorKey: "dateOfJoining",
        header: "DOJ",
      },
      {
        accessorKey: "yearExperience",
        header: "YOE",
      },
      {
        accessorKey: "manager",
        header: "Manager",
      },
      {
        accessorKey: "active",
        header: "Active",
      },
    ],
    []
  );

  return (
    <>
      <Grid align="right">
        <Button
          sx={{ m: 2 }}
          className="btn-add"
          variant="contained"
          color="success"
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon /> &nbsp; create
        </Button>
      </Grid>
      <MaterialReactTable columns={columns} data={tableData} />
      <DataForm open={open} handleClose={handleClose} />
    </>
  );
};

export default DataGrid;
