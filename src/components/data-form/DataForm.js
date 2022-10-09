import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const DataForm = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
  const { firstName, lastName, email } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create New Employee"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="firstName"
              placeholder="Enter your first name"
              fullWidth
              variant="outlined"
              margin="dense"
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <TextField
              id="lastName"
              placeholder="Enter your last name"
              fullWidth
              variant="outlined"
              margin="dense"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <TextField
              id="email"
              placeholder="Enter your email"
              fullWidth
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} variant="outlined">
            close
          </Button>
          <Button
            onClick={() => handleFormSubmit()}
            color="primary"
            variant="contained"
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataForm;
