import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const EmployeeAccount = () => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="emp-id"
            label="Emp ID"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="pan"
            label="PAN"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="uan"
            label="UAN"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="pf-no"
            label="PF Number"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default EmployeeAccount;
