import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClientForm from "../client-form";

const ClientGrid = () => {
  const [tableData, setTableData] = useState([]);
  const url = "http://localhost:4000/clients";
  const [clientForm, setClientForm] = useState(false);

  const handleClickOpen = (type) => {
    if (type === "client") {
      setClientForm(true);
    }
  };

  const handleClose = (type) => {
    if (type === "client") {
      setClientForm(false);
    }
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch('/api/client/allClients')
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "clientId", //access nested data with dot notation
        header: "Client ID",
      },
      {
        accessorKey: "clientName",
        header: "Client Name",
      },
      {
        accessorKey: "clientLocation", //normal accessorKey
        header: "Client Location",
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
          onClick={() => handleClickOpen("client")}
        >
          <AddCircleOutlineIcon /> &nbsp; create client
        </Button>
      </Grid>
      <MaterialReactTable columns={columns} data={tableData} />
      <ClientForm open={clientForm} handleClose={() => handleClose("client")} />
    </>
  );
};

export default ClientGrid;
