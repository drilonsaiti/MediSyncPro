import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import ClinicTable from "../features/Clinic/ClinicTable.jsx";
import AddClinic from "../features/Clinic/AddClinic.jsx";

const Clinic = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All clinics</Heading>

            </Row>


            <Row>
                <ClinicTable/>
                <AddClinic/>
            </Row>


        </>
    );
};

export default Clinic;