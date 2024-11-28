import React, {useState, useEffect, FormEvent} from "react";
import PasswordOption from "../PasswordOption/PasswordOption";
import {IServiceCore, IServiceItem} from "../../interfaces/intarfaces";

import FileCopyIcon from '@mui/icons-material/FileCopy';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import './ServiceCore.css';

const ServiceCore = ({passwords, setPasswords, onClose}: IServiceCore) => {
    const [serviceName, setServiceName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [actionStatus, setActionStatus] = useState<boolean>(false);
    const [actionStatusText, setActionStatusText] = useState<string>('');
    const [actionColor, setActionColor] = useState<string>('white');

    const [passwordLength, setPasswordLength] = useState<string | number>(8);
    const [uppercase, setUppercase] = useState<boolean>(true);
    const [lowercase, setLowercase] = useState<boolean>(true);
    const [numbers, setNumbers] = useState<boolean>(true);
    const [symbols, setSymbols] = useState<boolean>(true);
    const [userSymbols, setUserSymbols] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const generatePassword = () => {
        let password: string = "";
        for (let i: number = 0; i < passwordLength; i++) {
            let choice: number = random(0, 3);
            if (userSymbols) {
                password = '';
            } else if (lowercase && choice === 0) {
                password += randomLower();
            } else if (uppercase && choice === 1) {
                password += randomUpper();
            } else if (symbols && choice === 2) {
                password += randomSymbol();
            } else if (numbers && choice === 3) {
                password += random(0, 9);
            } else if (!numbers && !symbols && !uppercase && !lowercase) {
                password = ''
            } else {
                i--;
            }
        }
        setPassword(password);
        return password;
    };

    const random = (min: number = 0, max: number = 1) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    };

    const randomLower = () => {
        return String.fromCharCode(random(97, 122));
    };

    const randomUpper = () => {
        return String.fromCharCode(random(65, 90));
    };

    const randomSymbol = () => {
        const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
        return symbols[random(0, symbols.length - 1)];
    };


    useEffect(() => {
        generatePassword();
    }, [passwordLength, numbers, uppercase, lowercase, symbols, userSymbols]);


    const delay = async (ms: number) => {
        setActionStatusText('Имитация отправки данных на сервер...');
        setActionColor('');
        return new Promise((resolve) =>
            setTimeout(resolve, ms));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!serviceName || !password) {
            alert('Нужно ввести имя сервиса или пароль');
            return
        }
        await delay(2000);
        const randomBool = Math.random() >= 0.5;
        setActionStatus(randomBool)
        if (actionStatus) {
            setActionStatusText('Успех');
            setActionColor('green');

            const newPassword = {
                serviceName,
                password,
            };

            const newPasswords: IServiceItem[] = passwords ? [...passwords, newPassword] : [newPassword];
            setPasswords(newPasswords);
            localStorage.setItem('passwords', JSON.stringify(newPasswords));

            setServiceName('');
            setPassword(generatePassword());
            setTimeout(() => {
                onClose();
            }, 2000);

        } else {
            setActionStatusText('Отказ');
            setActionColor('red');
        }
    }

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(!open);
        navigator.clipboard.writeText(password);
    };

    return (
        <>
            <div className='service-core-container'>
                <h2>Сгенерировать пароль</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Название сервиса"
                        variant="outlined"
                        onChange={(e) => setServiceName(e.target.value)}
                        value={serviceName}

                    />
                    <div className='options'>
                        <PasswordOption
                            label='Длинна пароля:'
                            type='number'
                            name='length'
                            min='4'
                            max='50'
                            defaultValue={passwordLength}
                            onChange={(e) => setPasswordLength(e.target.value)}
                        />

                        <PasswordOption
                            label='Использовать символы верхнего регистра:'
                            type='checkbox'
                            name='uppercase'
                            defaultChecked={uppercase}
                            disabled={userSymbols}
                            onChange={(e) => setUppercase(e.target.checked)}
                        />

                        <PasswordOption
                            label='Использовать символы нижнего регистра:'
                            type='checkbox'
                            name='lowercase'
                            defaultChecked={lowercase}
                            disabled={userSymbols}
                            onChange={(e) => setLowercase(e.target.checked)}
                        />

                        <PasswordOption
                            label='Использовать цифры:'
                            type='checkbox'
                            name='numbers'
                            defaultChecked={numbers}
                            disabled={userSymbols}
                            onChange={(e) => setNumbers(e.target.checked)}
                        />

                        <PasswordOption
                            label='Использовать спецсимволы:'
                            type='checkbox'
                            name='symbols'
                            defaultChecked={symbols}
                            disabled={userSymbols}
                            onChange={(e) => setSymbols(e.target.checked)}
                        />

                        <PasswordOption
                            label='Свой пароль:'
                            type='checkbox'
                            name='user-symbols'
                            defaultChecked={userSymbols}
                            onChange={(e) => setUserSymbols(e.target.checked)}
                        />
                    </div>
                    <span className='status-text' style={{color: actionColor}}>{actionStatusText}</span>
                    <div className='pass-inp'>
                        <TextField
                            sx={{marginTop: '20px', marginBottom: '20px', width: '100%'}}
                            id="outlined-basic"
                            label="Пароль"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            inputProps={{maxLength: passwordLength}}
                        />
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                        <Tooltip
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Скопировано"

                        >
                            <FileCopyIcon
                                className="copy"
                                onClick={handleTooltipOpen}
                                sx={{cursor: 'pointer', marginTop: '35px'}}
                            />
                        </Tooltip>
                        </ClickAwayListener>
                    </div>
                    <Button
                        type='submit'
                        variant="contained"
                    >
                        Сохранить пароль
                    </Button>

                </form>
            </div>
        </>
    )
}
export default ServiceCore;