import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import MedicalReportRow from "./MedicalReportRow.jsx";

import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";
import {useMedicalReports} from "./useMedicalReport.js";

const MedicalReportTable = () => {
    const {isLoading, medicalReports, totalElements} = useMedicalReports();

    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 2fr 2fr 1.5fr 1fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Patient</div>
                    <div>Doctor</div>
                    <div>Service</div>
                    <div>Appointment date</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={medicalReports} render={
                    spc => <MedicalReportRow medicalReport={spc} key={spc.reportId}/>
                }/>

                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default MedicalReportTable;