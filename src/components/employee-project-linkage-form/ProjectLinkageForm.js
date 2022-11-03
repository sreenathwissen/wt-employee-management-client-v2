import React, { useState } from "react";
import { 
    InputLabel, 
    FormControl, 
    DialogTitle, 
    DialogContentText, 
    DialogContent, 
    DialogActions, 
    Dialog, 
    Button,
    Input,
    FormHelperText
} from '@mui/material';

const ProjectLinkageForm = ({ open, handleClose }) => {

    return (
        <div>
            <style>{"\
            .box{\
            padding:20px;\
            margin-top:10px;\
            }\
        "}</style>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            {"Enter The Details for Project Assignment"}
            </DialogTitle>
            <DialogContent className="box">
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Project ID</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Project's ID.</FormHelperText>
            </FormControl>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Employee ID</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Employee's ID.</FormHelperText>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleClose}>Asign Employee</Button>
                <Button variant="outlined" onClick={handleClose}>close</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default ProjectLinkageForm;
