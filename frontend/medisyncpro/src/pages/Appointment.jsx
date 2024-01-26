import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";
import AppointmentTable from "../features/Appointment/AppointmentTable.jsx";
import AddAppointment from "../features/Appointment/AddAppointment.jsx";
import AppointmentTableOperations from "../features/Appointment/AppointmentTableOperations.jsx";


const Appointment = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <AppointmentTableOperations/>

            </Row>

        <Row>
            <AppointmentTable/>
            <AddAppointment/>
        </Row>
        </>
    );
};

export default Appointment;