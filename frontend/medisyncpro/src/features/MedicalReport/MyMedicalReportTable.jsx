import React from 'react';
import {useMyMedicalReports} from "./useMedicalReport.js";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import MedicalReportRow from "./MedicalReportRow.jsx";
import Pagination from "../../ui/Pagination.jsx";

const MyMedicalReportTable = () => {
    const {isLoading, medicalReports, totalElements} = useMyMedicalReports();

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

export default MyMedicalReportTable;