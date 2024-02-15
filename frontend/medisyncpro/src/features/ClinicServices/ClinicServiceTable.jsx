import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ClinicServiceRow from "./ClinicServiceRow.jsx";
import Spinner from "../../ui/Spinner.jsx";
import {useClinicServices} from "./useClinicService.js";
import Pagination from "../../ui/Pagination.jsx";

const ClinicServiceTable = () => {
    const {isLoading, clinicServices, totalElements} = useClinicServices();


    if (isLoading) return <Spinner/>

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

                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default ClinicServiceTable;