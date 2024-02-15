import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import SpecializationsRow from "./SpecializationsRow.jsx";
import {useSpecializations} from "./useSpecializations.js";
import Spinner from "../../ui/Spinner.jsx";

const SpecializationsTable = ({specializationData,forClinic}) => {
    const {isLoading, specializations} = useSpecializations();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Specialization</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={forClinic ? specializationData : specializations} render={
                    spc => <SpecializationsRow specialization={spc} key={spc.specializationId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default SpecializationsTable;