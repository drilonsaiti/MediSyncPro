import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import DoctorRow from "./DoctorRow.jsx";
import {useDoctors} from "./useDoctors.js";
import Spinner from "../../ui/Spinner.jsx";

const DoctorTable = () => {
    const {isLoading, doctors} = useDoctors();


    if (isLoading) return <Spinner/>

    console.log(doctors);
    return (
        <Menus>
            <Table columns={'0.6fr 3fr repeat(3,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Specialization</div>
                    <div>Working time</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={doctors} render={
                    spc => <DoctorRow doctor={spc} key={spc.doctorId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default DoctorTable;