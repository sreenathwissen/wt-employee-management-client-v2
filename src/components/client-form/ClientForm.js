import React, { useEffect, useState } from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    TextField,
    InputBase,
    Autocomplete
} from '@mui/material';
import { Row, Col, Container } from "react-bootstrap";

const ClientForm = ({ open, handleClose }) => {
    const [clientName, setClientName] = useState('');
    const [clientLocation, setClientLocation] = useState('');
    const [addClientValidation, setAddClientValidation] = useState(false);
    const [clientSearch, setClientSearch] = useState([]);
    const url = "/api/client";

    useEffect(() => {
        if (clientName.length >= 3 && clientLocation.length >= 3)
            setAddClientValidation(true);
        else
            setAddClientValidation(false);

        if (clientSearch[0]?.clientName === clientName) {
            let flag = false;
            clientSearch.forEach((client) => {
                if (client.clientLocation === clientLocation) {
                    flag = true;
                }
            });
            setAddClientValidation(!flag);
        }
    }, [clientLocation, clientName]);

    useEffect(() => {
        fetch('/api/client/search?clientName=' + clientName)
            .then((resp) => resp.json())
            .then((resp) => setClientSearch(resp));
        console.log(clientSearch[0]?.clientName === clientName);
    }, [clientName]);

    const saveClient = () => {
        const data = [{
            "clientLocation": clientLocation,
            "clientName": clientName
        }];
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((resp) => console.log(resp));
        setClientLocation('');
        setClientName('');
        handleClose();
    };

    const onClose = () => {
        setClientLocation('');
        setClientName('');
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Enter The Client Details"}
                </DialogTitle>
                <DialogContent>
                    <Container maxWidth="sm">
                        <Row>
                            <Col>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    fullWidth
                                    options={clientSearch.map((option) => option.clientName)}
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            setClientName(newValue);
                                        } else if (newValue && newValue.inputValue) {
                                            setClientName(newValue.inputValue);
                                        } else {
                                            setClientName(newValue);
                                        }
                                    }}
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                {...params}
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Client Name"
                                                type="serch"
                                                fullWidth
                                                variant="standard"
                                                error={clientName.length >= 3 ? false : true}
                                                helperText="Enter Client's Name"
                                                required={true}
                                                value={clientName}
                                                onChange={(e) => { setClientName(e.target.value) }}
                                            />
                                    }
                                />
                            </Col>
                            <Col>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Client Location"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={clientLocation.length >= 3 ? false : true}
                                    helperText="Enter Client's Location."
                                    required={true}
                                    value={clientLocation}
                                    onChange={(e) => { setClientLocation(e.target.value) }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={saveClient} disabled={!addClientValidation}>add client</Button>
                    <Button variant="outlined" onClick={onClose}>close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ClientForm;
