import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import AppointmentForPatientRow from "./AppointmentForPatientRow.jsx";
import Pagination from "../../ui/Pagination.jsx";

const AppointmentPatientTable = ({appointment}) => {
    return (
        <Menus>
            <Table columns={'0.6fr 2fr repeat(5,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Patient</div>
                    <div>Doctor</div>
                    <div>Date</div>
                    <div>Service</div>
                    <div>Attended</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={appointment} render={
                    spc => <AppointmentForPatientRow appointment={spc} key={spc.appointmentId}/>
                }/>

                <Table.Footer>
                    <Pagination count={appointment?.length ?? 0}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default AppointmentPatientTable;