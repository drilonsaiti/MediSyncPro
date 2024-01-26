import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import ClinicScheduleTable from "../features/ClinicSchedule/ClinicScheduleTable.jsx";
import AddClinicSchedule from "../features/ClinicSchedule/AddClinicSchedule.jsx";

const ClinicSchedule = () => {
    return (
        <>
            <Row type="horizontal" change="yes">
                <Heading as="h1">All schedule</Heading>
                <p>Test</p>

            </Row>

            <Row>
                <ClinicScheduleTable/>
                <AddClinicSchedule/>
            </Row>

        </>
    );
};

export default ClinicSchedule;