import React from "react";
import {ISimpleDialogProps} from "../../interfaces/intarfaces";

import ServiceCore from "../ServiceCore/ServiceCore";
import Dialog from '@mui/material/Dialog';

const SimpleDialog = (props: ISimpleDialogProps) => {
    const { onClose, open, passwords, setPasswords } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <ServiceCore passwords={passwords} setPasswords={setPasswords} onClose={handleClose} />
        </Dialog>
    );
}

export default SimpleDialog;