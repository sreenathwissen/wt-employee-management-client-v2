import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
  const {id,name,age,email}=data;
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <form onSubmit={handleFormSubmit}>
        <DialogTitle id="alert-dialog-title">
        {id?"Update User Record":"Create New User" }
        

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
            <TextField required type="text" id="name" value={name} onChange={e=>onChange(e)} placeholder='Enter Your Name' label="Name" margin="dense" fullWidth />
            <TextField type="number" id="age" value={age} onChange={e=>onChange(e)} placeholder='Enter Your Age' label="Age" margin="dense" fullWidth />
            <TextField type="email" id="email" value={email} onChange={e=>onChange(e)} placeholder='Enter Your Email' label="Email" margin="dense" fullWidth />
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
          <Button type="submit"  variant="contained"
          >
            {id?"Update":"Submit"}
          </Button>

        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
