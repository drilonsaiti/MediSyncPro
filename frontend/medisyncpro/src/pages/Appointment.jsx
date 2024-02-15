import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";
import AppointmentTable from "../features/Appointment/AppointmentTable.jsx";
import AddAppointment from "../features/Appointment/AddAppointment.jsx";
import AppointmentTableOperations from "../features/Appointment/AppointmentTableOperations.jsx";
import SearchInput from "../ui/SearchInput.jsx";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";


const Appointment = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearchInputChange = (event) => {
        const newSearchParam = new URLSearchParams(searchParams);
        event === '' ? setSearchInput('') :
            setSearchInput(event.target.value);
        newSearchParam.set('nameOrEmail', event.target.value)
        setSearchParams(newSearchParam);
    };

    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <Row type="horizontal" style={{gap: '3rem'}}>
                    <SearchInput value={searchInput} onChange={handleSearchInputChange}/>
                    <AppointmentTableOperations/>
                </Row>

            </Row>

            <Row>
                <AppointmentTable searchInput={searchInput}/>
                <AddAppointment/>
            </Row>
        </>
    );
};

export default Appointment;