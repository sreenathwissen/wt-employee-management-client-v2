import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const EmployeeAddress = () => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="addr-id"
            label="Address Id"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="flat-no"
            label="Flat No"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="state"
            label="State"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="street"
            label="Street"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="address-type"
            label="Address Type"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="emp-id"
            label="Emp ID"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="country"
            label="Country"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="city"
            label="City"
            variant="standard"
            margin="normal"
            fullWidth
          />
          <TextField
            id="pincode"
            label="Pin Code"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default EmployeeAddress;
