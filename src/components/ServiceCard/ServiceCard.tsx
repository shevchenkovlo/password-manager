import React from "react";
import './ServiceCard.css';
import Button from '@mui/material/Button';

interface IServiceCardProps {
    serviceName: string;
    password: string;
    index: number;
    handleDelete: (index: number) => void;
}

const ServiceCard = (props: IServiceCardProps) => {
    const {serviceName, password, index, handleDelete} = props;
    return (
        <>
            <div key={index} className='card'>
                <div className=''>
                    <div className=''>
                        <span className='card-name'>Сервис</span>: {serviceName}
                        <br/>
                        <span className='card-name'>Пароль</span>: {password}
                    </div>
                </div>
                <Button
                    variant="outlined"
                    onClick={() => handleDelete(index)}
                    sx={{margin: '20px 10px'}}
                >
                    Удалить
                </Button>
            </div>
        </>
    )
}

export default ServiceCard;