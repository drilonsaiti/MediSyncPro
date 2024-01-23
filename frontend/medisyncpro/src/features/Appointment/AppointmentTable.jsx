import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import AppointmentRow from "./AppointmentRow.jsx";
import {useAppointments} from "./useAppointments.js";
import Spinner from "../../ui/Spinner.jsx";

const AppointmentTable = () => {
    const {isLoading, appointments} = useAppointments();


    if (isLoading) return <Spinner/>

    console.log(appointments);
    return (
        <Menus>
            <Table columns={'0.6fr 3fr 1fr'}>
                <Table.Header>
                    <div>Id</div>
                    <div>Receptionist</div>
                    <div></div>

                </Table.Header>
                <Table.Body data={appointments} render={
                    spc => <AppointmentRow appointment={spc} key={spc.appointmentId}/>
                }/>

            </Table>
        </Menus>
    );
};

export default AppointmentTable;