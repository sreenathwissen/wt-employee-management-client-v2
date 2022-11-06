import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const EmployeeSkill = () => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="emp-id"
            label="Emp ID"
            variant="standard"
            placeholder="Emp ID"
            margin="normal"
            fullWidth
          />
          <TextField
            id="skill-name"
            label="Skill Name"
            variant="standard"
            placeholder="Skill Name"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="skill-id"
            label="Skill ID"
            variant="standard"
            placeholder="skill ID"
            margin="normal"
            fullWidth
          />
          <TextField
            id="level"
            label="Level"
            variant="standard"
            placeholder="Level"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default EmployeeSkill;
