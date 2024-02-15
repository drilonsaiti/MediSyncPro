import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicRow from "./ClinicRow.jsx";
import {useClinics} from "./useClinic.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

const ClinicTable = () => {
    const {isLoading, clinics, totalElements} = useClinics();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Address</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={clinics?.sort((a, b) => a.clinicId - b.clinicId)} render={
                    spc => <ClinicRow clinic={spc} key={spc.clinicId}/>
                }/>

                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default ClinicTable;