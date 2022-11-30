import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from "@mui/material/Button";

const SkillForm = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
  const { skillNames } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Skill"}
          <span style={{ marginLeft: "310px" }}>
            <CloseIcon
              onClick={handleClose}
              style={{ cursor: "pointer", color: "red" }}
            />
          </span>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item xs={6}>
              <TextField
                id="skillName"
                label="Skill Name"
                variant="standard"
                placeholder="Skill Name"
                margin="normal"
                value={skillNames}
                onChange={(e) => onChange(e)}
                fullWidth
                required
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SkillForm;
