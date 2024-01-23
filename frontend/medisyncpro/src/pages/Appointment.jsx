import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row.jsx";
import Button from "../ui/Button.jsx";
import AppointmentTable from "../features/Appointment/AppointmentTable.jsx";
import AddAppointment from "../features/Appointment/AddAppointment.jsx";


const Appointment = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <p>Test</p>

            </Row>

        <Row>
            <AppointmentTable/>
            <AddAppointment/>
        </Row>
        </>
    );
};

export default Appointment;