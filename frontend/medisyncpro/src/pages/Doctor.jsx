import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import DoctorTable from "../features/Doctor/DoctorTable.jsx";
import AddDoctor from "../features/Doctor/AddDoctor.jsx";

const Doctor = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <p>Test</p>

            </Row>


            <Row>
                <DoctorTable/>
                <AddDoctor/>
            </Row>

        </>
    );
};

export default Doctor;