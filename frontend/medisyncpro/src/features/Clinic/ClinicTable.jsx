import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicRow from "./ClinicRow.jsx";
import {useClinics} from "./useClinic.js";
import Spinner from "../../ui/Spinner.jsx";

const ClinicTable = () => {
    const {isLoading, clinics} = useClinics();


    if (isLoading) return <Spinner/>

    console.log(clinics);
    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Address</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={clinics} render={
                    spc => <ClinicRow clinic={spc} key={spc.clinicId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default ClinicTable;