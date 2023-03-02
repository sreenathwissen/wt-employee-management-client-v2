import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EmployeeInfo = () => {
  const [value3, setValue3] = React.useState(dayjs("2022-04-07"));
  const [value4, setValue4] = React.useState(dayjs("2022-04-07"));
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="desg-id"
            label="Desg Id"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="dep-id"
            label="Department Id"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="role-id"
            label="Role Id"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="joining-location"
            label="Joining Location"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="work-phone"
            label="Work Phone"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="manager"
            label="Manager"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Date of Joining"
              openTo="year"
              views={["year", "month", "day"]}
              value={value3}
              fullWidth
              onChange={(newValue) => {
                setValue3(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="experience"
            label="Exp DOJ"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="type"
            label="Type"
            variant="standard"
            placeholder="Full Time, Consultant"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Exit Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={value4}
              fullWidth
              onChange={(newValue) => {
                setValue4(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </LocalizationProvider>
        </Grid2>
      </Grid2>
    </>
  );
};

export default EmployeeInfo;
