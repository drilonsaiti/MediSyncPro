import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import ReceptionistRow from "./ReceptionistRow.jsx";
import {useReceptionist} from "./useReceptionist.js";
import Spinner from "../../ui/Spinner.jsx";

const ReceptionistTable = ({receptionistsByClinic, forClinic}) => {
    const {isLoading, receptionist} = useReceptionist();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1.5fr repeat(2,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Clinic</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={forClinic ? receptionistsByClinic : receptionist} render={
                    spc => <ReceptionistRow receptionist={spc} key={spc.receptionistId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default ReceptionistTable;