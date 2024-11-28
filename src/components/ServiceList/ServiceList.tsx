import React, {useState} from 'react';
import {IServiceItem, IServiceListProps} from "../../interfaces/intarfaces";

import ServiceCard from "../ServiceCard/ServiceCard";
import TextField from '@mui/material/TextField';

import './ServiceList.css';

const ServiceList = (props: IServiceListProps) => {
    const { service, onDelete } = props;
    const [search, setSearch] = useState<string>('');

    const handleDelete = (index: number):void => {
        onDelete(index);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filteredService: IServiceItem[] = service.filter((service: IServiceItem) => {
        return service.serviceName.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <>
            <h2 className='title'>Список сервисов</h2>
            <TextField id="standard-basic" label="Поиск сервиса..." variant="standard" onChange={handleSearch} />
            <div className='service-list'>
                {filteredService.map((service: IServiceItem, index: number) => (
                    <ServiceCard key={index} serviceName={service.serviceName} password={service.password} index={index} handleDelete={handleDelete}></ServiceCard>
                ))}
            </div>
        </>
    )
}
export default ServiceList;