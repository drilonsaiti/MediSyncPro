import React from 'react';
import AppointmentPatientTable from "../features/Appointment/AppontmentPatientTable.jsx";
import Row from "../ui/Row.jsx";
import {useMyAppointment} from "../features/Appointment/useAppointments.js";
import Spinner from "../ui/Spinner.jsx";

const MyAppointment = () => {
    const {isLoading, appointments, totalElements} = useMyAppointment();

    if (isLoading) return <Spinner/>

    return (
        <Row>
            <AppointmentPatientTable appointment={appointments}/>
        </Row>
    );
};

export default MyAppointment;