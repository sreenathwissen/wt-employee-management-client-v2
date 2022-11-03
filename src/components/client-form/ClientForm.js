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

const ClientForm = ({ open, handleClose }) => {

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
            {"Enter The Client Details"}
            </DialogTitle>
            <DialogContent className="box">
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Client Name</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Client's Name.</FormHelperText>
            </FormControl>
            <FormControl className="box">
                <InputLabel color="success" htmlFor="my-input">Client Location</InputLabel>
                <Input color="success" id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Enter Client's Location.</FormHelperText>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleClose}>add client</Button>
                <Button variant="outlined" onClick={handleClose}>close</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default ClientForm;
