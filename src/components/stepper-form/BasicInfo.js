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

const BasicInfo = () => {
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const [value2, setValue2] = React.useState(dayjs("2022-04-07"));

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="firstName"
            label="Frist Name"
            variant="standard"
            margin="normal"
            required
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container>
        <Grid2 item xs={12}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={4} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Date of Birth"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              fullWidth
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 item xs={4}>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              variant="standard"
              id="gender"
              label="gender"
              fullWidth
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"O"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 item xs={4}>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel id="blood-group-label">Blood Group</InputLabel>
            <Select
              labelId="blood-group-label"
              variant="standard"
              id="bloodGrp"
              label="bloodGrp"
              fullWidth
            >
              <MenuItem value={"a+"}>A Positive</MenuItem>
              <MenuItem value={"a-"}>A Negative</MenuItem>
              <MenuItem value={"b+"}>B Positive</MenuItem>
              <MenuItem value={"b-"}>B Negative</MenuItem>
              <MenuItem value={"ab+"}>AB Positive</MenuItem>
              <MenuItem value={"ab-"}>AB Negative</MenuItem>
              <MenuItem value={"o+"}>O Positive</MenuItem>
              <MenuItem value={"o-"}>O Negative</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="primary-mobile-number"
            label="Mobile Number"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="secondary-mobile-number"
            label="Alternative Mobile Number"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            id="primary-emergency-mobile-number"
            label="Emergency Mobile Number"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="primary-emergency-mobile-number"
            label="Alternative Emergency Mobile Number"
            variant="standard"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6} sx={{ mt: 2, minWidth: 120 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Marital Status Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={value2}
              fullWidth
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            id="employee-status"
            label="Employee status"
            variant="standard"
            placeholder="Joining, Probation"
            margin="normal"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default BasicInfo;
