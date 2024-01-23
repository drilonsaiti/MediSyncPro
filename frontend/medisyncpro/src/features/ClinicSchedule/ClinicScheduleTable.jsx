import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicScheduleRow from "./ClinicScheduleRow.jsx";
import {useClinicSchedules} from "./useClinicSchedule.js";
import Spinner from "../../ui/Spinner.jsx";

const ClinicScheduleTable = () => {
    const {isLoading, clinicSchedules} = useClinicSchedules();


    if (isLoading) return <Spinner/>

    console.log(clinicSchedules);
    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Receptionist</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={clinicSchedules} render={
                    spc => <ClinicScheduleRow clinicSchedule={spc} key={spc.clinicScheduleId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default ClinicScheduleTable;