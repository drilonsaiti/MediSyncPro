import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import AppointmentRow from "./AppointmentRow.jsx";
import {useAppointments} from "./useAppointments.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";
import AppointmentForPatientRow from "./AppointmentForPatientRow.jsx";

const AppointmentTable = ({searchInput, appointment, forPatient}) => {
    const {isLoading, appointments, totalElements} = useAppointments();


    if (isLoading) return <Spinner/>

    return (
        <Menus>
            <Table columns={'0.6fr 2fr repeat(5,1fr)'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Patient</div>
                    <div>Doctor</div>
                    <div>Date</div>
                    <div>Service</div>
                    <div>Attended</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={forPatient ? appointment : appointments} render={
                    spc => forPatient ? <AppointmentForPatientRow appointment={spc} key={spc.appointmentId}/> :
                        <AppointmentRow appointment={spc} key={spc.appointmentId}/>
                }/>

                <Table.Footer>
                    <Pagination count={totalElements}/>
                </Table.Footer>

            </Table>
        </Menus>
    );
};

export default AppointmentTable;