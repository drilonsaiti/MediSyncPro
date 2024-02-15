import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import DoctorRow from "./DoctorRow.jsx";
import {useDoctors} from "./useDoctors.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

const DoctorTable = ({doctorsByClinic, forClinic}) => {

    const {isLoading, doctors, totalElements} = useDoctors();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 3fr repeat(2,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Specialization</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={forClinic ? doctorsByClinic : doctors} render={
                    spc => <DoctorRow doctor={spc} key={spc.doctorId}/>
                }/>
                <Table.Footer>
                    <Pagination count={forClinic ? doctorsByClinic.length : totalElements}/>
                </Table.Footer>
            </Table>
        </Menus>
    );
};

export default DoctorTable;