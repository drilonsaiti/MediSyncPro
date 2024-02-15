import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicScheduleRow from "./ClinicScheduleRow.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";
import {useClinicSchedules} from "./useClinicSchedule.js";

const ClinicScheduleTable = () => {
    const {isLoading, clinicSchedules, totalElements} = useClinicSchedules();


    if (isLoading) return <Spinner/>


    const data = Object.entries(clinicSchedules).map(([date, scheduleDtos]) => ({date: date, schedules: scheduleDtos}));
    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr'}>
                <Table.Header>
                    <div>Date</div>
                    <div>Length of schedules</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={clinicSchedules} render={
                    spc => <ClinicScheduleRow clinicSchedule={spc} key={spc.date}/>
                }/>
                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default ClinicScheduleTable;