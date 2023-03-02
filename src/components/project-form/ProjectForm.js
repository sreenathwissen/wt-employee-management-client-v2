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

const ProjectForm = ({ open, handleClose }) => {

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
            {"Enter The New Project's Details"}
            </DialogTitle>
            <DialogContent className="box">
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Client ID</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Client's ID.</FormHelperText>
            </FormControl>
            <br></br>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Project Name</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Project's Name.</FormHelperText>
            </FormControl>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Project Location</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Project's Location.</FormHelperText>
            </FormControl>
            <br></br>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Project Lead</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Project's Lead.</FormHelperText>
            </FormControl>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Project Type</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Project's Type.</FormHelperText>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleClose}>create project</Button>
                <Button variant="outlined" onClick={handleClose}>close</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default ProjectForm;
