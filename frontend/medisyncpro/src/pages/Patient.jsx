import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import PatientTable from "../features/Patient/PatientTable.jsx";
import AddPatient from "../features/Patient/AddPatient.jsx";

const Patient = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <p>Test</p>

            </Row>

    <Row>
        <PatientTable/>
        <AddPatient/>
    </Row>
        </>
    );
};

export default Patient;