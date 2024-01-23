import React from 'react';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import MedicalReportRow from "./MedicalReportRow.jsx";
import {useMedicalReports} from "./useMedicalReport.js";
import Spinner from "../../ui/Spinner.jsx";

const MedicalReportTable = () => {
    const {isLoading, medicalReports} = useMedicalReports();


    if (isLoading) return <Spinner/>

    console.log(medicalReports);
    return (
        <Menus>
            <Table columns={'0.6fr 2fr 2fr 1.5fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Patient</div>
                    <div>Doctor</div>
                    <div>Appointment date</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={medicalReports} render={
                    spc => <MedicalReportRow medicalReport={spc} key={spc.reportId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default MedicalReportTable;