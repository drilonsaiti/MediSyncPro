import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import PatientRow from "./PatientRow.jsx";
import {usePatients} from "./usePatient.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

const PatientTable = () => {
    const {isLoading, patients, totalElements} = usePatients();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 2fr 2fr 1.5fr repeat(4,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Address</div>
                    <div>Email</div>
                    <div>Contact number</div>

                    <div>Birthday</div>
                    <div>Gender</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={patients} render={
                    spc => <PatientRow patient={spc} key={spc.patientId}/>
                }/>

                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default PatientTable;