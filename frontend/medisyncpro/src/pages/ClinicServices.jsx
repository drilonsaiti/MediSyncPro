import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import ClinicServiceTable from "../features/ClinicServices/ClinicServiceTable.jsx";
import AddClinicService from "../features/ClinicServices/AddClinicService.jsx";

const ClinicServices = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All appointments</Heading>
                <p>Test</p>

            </Row>

            <Row>
                <ClinicServiceTable/>
                <AddClinicService/>
            </Row>


        </>
    );
};

export default ClinicServices;