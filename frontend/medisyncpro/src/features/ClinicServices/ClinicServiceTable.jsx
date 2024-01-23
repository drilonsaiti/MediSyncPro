import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicServiceRow from "./ClinicServiceRow.jsx";
import {useClinicServices} from "./useClinicService.js";
import Spinner from "../../ui/Spinner.jsx";

const ClinicServiceTable = () => {
    const {isLoading, clinicServices} = useClinicServices();


    if (isLoading) return <Spinner/>

    console.log(clinicServices);
    return (
        <Menus>
            <Table columns={'0.6fr 3fr repeat(4,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Duration</div>
                    <div>Price</div>
                    <div>Specialization</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={clinicServices} render={
                    spc => <ClinicServiceRow clinicService={spc} key={spc.serviceId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default ClinicServiceTable;