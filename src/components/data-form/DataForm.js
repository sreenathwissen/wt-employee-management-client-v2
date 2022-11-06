import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import StepperForm from "../stepper-form/StepperForm";
import CloseIcon from "@mui/icons-material/Close";
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
          <span style={{ marginLeft: "310px" }}>
            <CloseIcon
              onClick={handleClose}
              style={{ cursor: "pointer", color: "red" }}
            />
          </span>
        </DialogTitle>
        <DialogContent>
          <StepperForm />
        </DialogContent>
        <DialogActions>
          {/* <Button color="secondary" onClick={handleClose} variant="outlined">
            close
          </Button>
          <Button
            onClick={() => handleFormSubmit()}
            color="primary"
            variant="contained"
          >
            submit
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataForm;
