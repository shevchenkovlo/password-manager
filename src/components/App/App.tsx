import React, {useEffect, useState} from 'react';
import {IServiceItem} from "../../interfaces/intarfaces";
import SimpleDialog from "../SimpleDialog/SimpleDialog";

import Button from '@mui/material/Button';
import ServiceList from "../ServiceList/ServiceList";

import './App.css';

function App() {
    const [open, setOpen] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<IServiceItem[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (index: number) => {
        const updatedPasswords: IServiceItem[] = [...passwords];
        updatedPasswords.splice(index, 1);
        setPasswords(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    }

    useEffect(() => {

        let storedPasswords
        if(localStorage["passwords"]){
            // @ts-ignore
            storedPasswords = JSON.parse(localStorage.getItem('passwords') || '[]') ;
        }

        setPasswords(storedPasswords);
    }, []);

    return (
        <div className="App">
            <h2>Менеджер паролей на react</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Создать новый сервис
            </Button>
            <SimpleDialog
                passwords={passwords}
                setPasswords={setPasswords}
                open={open}
                onClose={handleClose}
            />
            <ServiceList service={passwords} onDelete={handleDelete}/>
        </div>
    );
}

export default App;
