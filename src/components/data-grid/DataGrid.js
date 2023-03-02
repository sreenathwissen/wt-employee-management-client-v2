import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DataForm from "../data-form";
import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const DataGrid = () => {
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [tableData, setTableData] = useState([]);
  const url = "http://localhost:4000/employees";
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      handleClose();
      getUser();
      setFormData(initialValue);
    });
  };

  const handleDelete = (id) => {
    fetch(url + `/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => getUser());
  };

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
    fetch("/api/employee/employees")
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Emp Id",
      },
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
        accessorKey: "doj",
        header: "DOJ",
      },
      {
        accessorKey: "manager",
        header: "Manager",
      },
    ],
    []
  );

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
          <AddCircleOutlineIcon /> &nbsp; create employee
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
        enableRowActions
        enableRowVirtualization
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton sx={{ ml: 3 }}>
                {/* onClick={() => table.setEditingRow(row)} */}
                <Edit />
              </IconButton>
            </Tooltip>
            {/* <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => handleDelete(row.original.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip> */}
          </Box>
        )}
      />
      <DataForm
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default DataGrid;
